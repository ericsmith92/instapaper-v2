const express = require('express');
const router = express.Router();
const scrapeController = require('../controllers/scrapeController');

router.get('/', scrapeController.homePage);
router.post('/scrape', scrapeController.checkAccount, 
                       scrapeController.scrapeAccount, 
                       scrapeController.saveAccount);
router.get('/update', scrapeController.update);

module.exports = router;