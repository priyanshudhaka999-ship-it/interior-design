const express = require('express');
const {
  getWebsiteSettings,
  updateWebsiteSettings,
} = require('../controllers/settingsController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getWebsiteSettings);
router.put('/', protectAdmin, updateWebsiteSettings);

module.exports = router;
