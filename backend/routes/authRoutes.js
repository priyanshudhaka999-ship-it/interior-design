const express = require('express');
const { body } = require('express-validator');
const {
  loginAdmin,
  logoutAdmin,
  getAdminProfile,
  updateAdminPassword,
} = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { loginRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post(
  '/login',
  loginRateLimiter,
  [
    body('email').isEmail().withMessage('Valid administrator email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  loginAdmin
);

router.post('/logout', logoutAdmin);
router.get('/me', protectAdmin, getAdminProfile);

router.put(
  '/password',
  protectAdmin,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('New password must be at least 8 characters long'),
  ],
  updateAdminPassword
);

module.exports = router;
