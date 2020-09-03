exports.renderDownload = (req, res) => {
    const finalImage = req.query.src
    res.render('download', { finalImage });
}