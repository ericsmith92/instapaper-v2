const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

router.get('/', scrapeController.homePage);
router.post('/scrape', scrapeController.scrapeAccount, 
                       scrapeController.saveAccount);

module.exports = router;