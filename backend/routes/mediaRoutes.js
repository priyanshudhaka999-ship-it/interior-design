const express = require('express');
const {
  getMediaAssets,
  uploadMediaAssets,
  deleteMediaAsset,
} = require('../controllers/mediaController');
const { protectAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', protectAdmin, getMediaAssets);
router.post('/upload', protectAdmin, upload.array('images', 10), uploadMediaAssets);
router.delete('/:id', protectAdmin, deleteMediaAsset);

module.exports = router;
