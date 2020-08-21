const mongoose = require('mongoose');
const Account = mongoose.model('Account');
const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const moment = require('moment');

exports.homePage = (req, res) => {
    res.render('index');
}

exports.scrapeAccount = async (req, res, next) => {
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
        req.body.handle = req.body.search;
        req.body.created = Date.now();
        next();
        return;
    })  
    .catch(function (error) {
        console.log(error);
    });
}

exports.saveAccount = async (req, res) => {
    const account = await (new Account(req.body)).save();
    res.render('preview', { account });
}

exports.checkAccount = async (req, res, next) => {   
    const account = await Account.findOne( { handle:  req.body.search } );
    
    //if no account exists, lets pass to scrape
    if(!account){
        next();
        return;
    }

    //otherwise, lets check when we last scraped it, see if it's been longer than an hour
    const lastScraped = account.created.getTime();
    const diff = Date.now() - lastScraped;
    const millisecsHour = 3600000;

    //if less than an hour ago, head directly to preview
    if(diff <= millisecsHour){
        console.log('scraped under an hour ago', millisecsHour - diff);
        res.render('preview', { account });
    }else{
    //otherwise, it exists but needs to be scraped again, send to update
        //res.json({diff});
        next('/update');
    }
}

exports.update = (req, res) => {
    res.json({'it': 'worked'});
}