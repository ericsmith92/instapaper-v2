exports.stitch = (req, res) => {
    //our json is on here
    //TODO: resize, and stitch images
    console.log(req.body);
    res.json({it : 'works'});
}