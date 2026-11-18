const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

  const isSecure =
    process.env.COOKIE_SECURE === 'true' || process.env.NODE_ENV === 'production';

  res.cookie('atelier_admin_token', token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

module.exports = generateTokenAndSetCookie;
