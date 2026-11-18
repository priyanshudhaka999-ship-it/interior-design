const express = require('express');
const { getDashboardOverview } = require('../controllers/dashboardController');
const { protectAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/overview', protectAdmin, getDashboardOverview);

module.exports = router;
