const express = require('express');
const { body } = require('express-validator');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { publicFormRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.post(
  '/',
  publicFormRateLimiter,
  [
    body('name').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email address is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('projectType').trim().notEmpty().withMessage('Project type is required'),
    body('budgetRange').trim().notEmpty().withMessage('Budget range is required'),
    body('location').trim().notEmpty().withMessage('Project location is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  createEnquiry
);

router.get('/', protectAdmin, getEnquiries);
router.put('/:id', protectAdmin, updateEnquiryStatus);
router.delete('/:id', protectAdmin, deleteEnquiry);

module.exports = router;
