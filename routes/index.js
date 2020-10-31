const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');
const previewController = require('../controllers/previewController');
const stitchController = require('../controllers/stitchController');
const downloadController = require('../controllers/downloadController');
const errorController = require('../controllers/errorController');

const { catchErrors } = require('../handlers/errorHandlers');

//scraping routes
router.get('/', scrapeController.homePage);
router.post('/scrape', catchErrors(scrapeController.checkAccount));

//preview
router.get('/scrape', previewController.renderPreview);

//stitching routes
//TODO: lets wrap middleware in catchErrors for async functions
router.post('/stitch', catchErrors(stitchController.resizeAndWriteThumbnails), 
                       catchErrors(stitchController.stitchImages));

router.get('/download', downloadController.renderDownload);
router.post('/download', downloadController.downloadImage);

//insufficient posts
router.get('/not-available', errorController.renderError);

module.exports = router;