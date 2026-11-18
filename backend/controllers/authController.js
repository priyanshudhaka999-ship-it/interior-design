const { validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const generateTokenAndSetCookie = require('../utils/generateToken');

// POST /api/auth/login
const loginAdmin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() }).select('+password');

    if (!admin || !(await admin.comparePassword(password))) {
      res.status(401);
      throw new Error('Invalid administrator email or password');
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = generateTokenAndSetCookie(res, admin._id);

    res.status(200).json({
      success: true,
      message: 'Signed in to Atelier Vera Admin Portal',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLoginAt: admin.lastLoginAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/logout
const logoutAdmin = async (req, res) => {
  res.clearCookie('atelier_admin_token', {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });
  res.status(200).json({
    success: true,
    message: 'Logged out safely',
  });
};

// GET /api/auth/me
const getAdminProfile = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

// PUT /api/auth/password
const updateAdminPassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array().map((e) => e.msg).join(', '));
    }

    const { currentPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id).select('+password');

    if (!admin || !(await admin.comparePassword(currentPassword))) {
      res.status(401);
      throw new Error('Current password is incorrect');
    }

    admin.password = newPassword;
    await admin.save();

    generateTokenAndSetCookie(res, admin._id);

    res.status(200).json({
      success: true,
      message: 'Administrator password updated safely',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminPassword,
};
