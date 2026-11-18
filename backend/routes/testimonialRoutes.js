const express = require('express');
const { body } = require('express-validator');
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getTestimonials);
router.get('/admin/all', protectAdmin, (req, res, next) => {
  req.query.includeUnpublished = 'true';
  return getTestimonials(req, res, next);
});

router.post(
  '/',
  protectAdmin,
  [
    body('clientName').trim().notEmpty().withMessage('Client name is required'),
    body('projectType').trim().notEmpty().withMessage('Project type is required'),
    body('feedback').trim().notEmpty().withMessage('Client feedback is required'),
  ],
  createTestimonial
);

router.put('/:id', protectAdmin, updateTestimonial);
router.delete('/:id', protectAdmin, deleteTestimonial);

module.exports = router;
