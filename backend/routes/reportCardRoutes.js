const express = require('express');
const router = express.Router();
const { createReportCard, getReportCard } = require('../controllers/reportCardController');

router.post('/report-cards', createReportCard);
router.get('/report-cards/:id', getReportCard);

module.exports = router;