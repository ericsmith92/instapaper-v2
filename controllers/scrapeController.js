const mongoose = require('mongoose');
const Account = mongoose.model('Account');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

exports.homePage = (req, res) => {
    res.render('index');
}

exports.checkAccount = async (req, res, next) => {   
    const account = await Account.findOne( { handle:  req.body.search } );
    
    //if no account exists, lets pass to scrape
    if(!account){
        req.body.accountExists = false;
        scrapeAccount(req, res);
        return;
    }

    //otherwise, lets check when we last scraped it, see if it's been longer than an hour
    const lastScraped = account.created.getTime();
    const diff = Date.now() - lastScraped;
    const millisecsHour = 3600000;

    //if less than an hour ago, head directly to preview
    if(diff <= millisecsHour){
        console.log('scraped under an hour ago', diff);
        res.render('preview', { account });
    }else{
        req.body.accountExists = true;
        scrapeAccount(req, res);
        return;
    }
}

scrapeAccount = async (req, res) => {
    axios.get(`https://www.instagram.com/${req.body.search}/`)
    .then(response => {
        return response.data;
    })
    .then(data =>{
        const dom = new JSDOM(data);
        const pageSourceJSON = JSON.parse(dom.window.document.querySelectorAll('script[type="text/javascript"]')[3].textContent.replace('window._sharedData = ', '').slice(0, -1));
        const availableThumbnails = pageSourceJSON['entry_data']["ProfilePage"][0].graphql.user.edge_owner_to_timeline_media.edges;
        const sources = availableThumbnails.map(thumbnail => thumbnail.node.thumbnail_src);
        req.body.imageSources = sources;
        
        if(!req.body.accountExists){
            saveAccount(req, res);
        }else{
            console.log('passing to update');
            updateAccount(req, res);
        }
        return;
    })  
    .catch(function (error) {
        console.log(error);
    });
}

saveAccount = async (req, res) => {
    req.body.handle = req.body.search;
    req.body.created = Date.now();
    const account = await (new Account(req.body)).save();
    
    res.render('preview', { account });
}

updateAccount = async (req, res) => {
    req.body.created = Date.now();
    
    const account = await Account.findOneAndUpdate({ handle: req.body.search }, req.body, {
        new: true,
        runValidators: true
    }).exec();

    res.render('preview', { account });
}