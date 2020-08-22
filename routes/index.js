const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');
const stitchController = require('../controllers/stitchController');

//scraping routes
router.get('/', scrapeController.homePage);
router.post('/scrape', scrapeController.checkAccount);

//stitching routes
router.post('/stitch', stitchController.stitch);



module.exports = router;