const express = require('express');
const { body } = require('express-validator');
const {
  getAvailableSlots,
  createAppointment,
  getAllAppointments,
  updateAppointment,
} = require('../controllers/appointmentController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { publicFormRateLimiter } = require('../middleware/rateLimitMiddleware');

const router = express.Router();

router.get('/availability', getAvailableSlots);

router.post(
  '/',
  publicFormRateLimiter,
  [
    body('consultationType').trim().notEmpty().withMessage('Consultation type is required'),
    body('preferredDate')
      .matches(/^\d{4}-\d{2}-\d{2}$/)
      .withMessage('Preferred date must be in YYYY-MM-DD format'),
    body('timeSlot')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .withMessage('Preferred time slot must be in HH:mm format'),
    body('clientName').trim().notEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Valid email address is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('projectType').trim().notEmpty().withMessage('Project type is required'),
    body('location').trim().notEmpty().withMessage('Project location is required'),
    body('requirements').trim().notEmpty().withMessage('Project requirements are required'),
  ],
  createAppointment
);

router.get('/', protectAdmin, getAllAppointments);
router.put('/:id', protectAdmin, updateAppointment);

module.exports = router;
