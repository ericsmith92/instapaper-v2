const mongoose = require('mongoose');
const Account = mongoose.model('Account');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.scrapeAccount = async (req, res) => {
    const handle = req.query.search.split(' ').join('').trim();
    console.log(handle);
    res.json({it: 'Works'});
}