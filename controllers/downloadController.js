exports.renderDownload = (req, res) => {
    const finalImage = req.query.src
    res.render('download', { finalImage });
}

exports.downloadImage = (req,res) => {
    res.download(`public/${req.body.path}`, err => {
        if(err) console.log(err);
    });
};