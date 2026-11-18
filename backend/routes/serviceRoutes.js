const express = require('express');
const { body } = require('express-validator');
const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getServices);
router.get('/admin/all', protectAdmin, (req, res, next) => {
  req.query.includeUnpublished = 'true';
  return getServices(req, res, next);
});

router.post(
  '/',
  protectAdmin,
  [
    body('title').trim().notEmpty().withMessage('Service title is required'),
    body('description').trim().notEmpty().withMessage('Service description is required'),
    body('deliverables').isArray({ min: 1 }).withMessage('At least one deliverable is required'),
    body('image.url').notEmpty().withMessage('Service image URL is required'),
  ],
  createService
);

router.put('/:id', protectAdmin, updateService);
router.delete('/:id', protectAdmin, deleteService);

module.exports = router;
