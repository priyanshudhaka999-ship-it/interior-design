const express = require('express');
const { body } = require('express-validator');
const {
  getProjects,
  getProjectBySlugOrId,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProjects);
router.get('/admin/all', protectAdmin, (req, res, next) => {
  req.query.includeUnpublished = 'true';
  return getProjects(req, res, next);
});
router.get('/:slugOrId', getProjectBySlugOrId);

router.post(
  '/',
  protectAdmin,
  [
    body('title').trim().notEmpty().withMessage('Project title is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('location').trim().notEmpty().withMessage('Location is required'),
    body('completionYear').isInt({ min: 1990, max: 2100 }).withMessage('Valid completion year is required'),
    body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
    body('overview').trim().notEmpty().withMessage('Project overview is required'),
    body('designConcept').trim().notEmpty().withMessage('Design concept is required'),
    body('challenges').trim().notEmpty().withMessage('Challenges summary is required'),
    body('solutions').trim().notEmpty().withMessage('Solutions summary is required'),
    body('coverImage.url').notEmpty().withMessage('Cover image URL is required'),
  ],
  createProject
);

router.put('/:id', protectAdmin, updateProject);
router.delete('/:id', protectAdmin, deleteProject);

module.exports = router;
