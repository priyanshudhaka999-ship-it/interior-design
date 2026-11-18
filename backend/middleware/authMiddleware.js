const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protectAdmin = async (req, res, next) => {
  try {
    let token = req.cookies?.atelier_admin_token;

    if (!token && req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        code: 'AUTH_REQUIRED',
        message: 'Authentication required. Please sign in to the studio portal.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      res.clearCookie('atelier_admin_token');
      return res.status(401).json({
        success: false,
        code: 'ADMIN_NOT_FOUND',
        message: 'Session invalid. Administrator account no longer exists.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.clearCookie('atelier_admin_token');
    const isExpired = error.name === 'TokenExpiredError';
    return res.status(401).json({
      success: false,
      code: isExpired ? 'SESSION_EXPIRED' : 'INVALID_TOKEN',
      message: isExpired
        ? 'Your administrator session has expired. Please sign in again.'
        : 'Invalid authentication token.',
    });
  }
};

module.exports = { protectAdmin };
