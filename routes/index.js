const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

router.get('/', scrapeController.homePage);
router.get('/scrape', scrapeController.scrapeAccount);

module.exports = router;