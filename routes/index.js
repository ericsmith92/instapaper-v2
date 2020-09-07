const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');
const previewController = require('../controllers/previewController');
const stitchController = require('../controllers/stitchController');
const downloadController = require('../controllers/downloadController');

//scraping routes
router.get('/', scrapeController.homePage);
router.post('/scrape', scrapeController.checkAccount);

//preview
router.get('/scrape', previewController.renderPreview);

//stitching routes
//TODO: lets wrap middleware in catchErrors for async functions
router.post('/stitch', stitchController.resizeAndWriteThumbnails, 
                       stitchController.stitchImages);

router.get('/download', downloadController.renderDownload);
router.post('/download', downloadController.downloadImage);

module.exports = router;