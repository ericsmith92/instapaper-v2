const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');
const stitchController = require('../controllers/stitchController');

//scraping routes
router.get('/', scrapeController.homePage);
router.post('/scrape', scrapeController.checkAccount);

//stitching routes
//TODO: lets wrap middleware in catchErrors for async functions
router.post('/stitch', stitchController.resizeAndWriteThumbnails, 
                       stitchController.stitchImages);

module.exports = router;