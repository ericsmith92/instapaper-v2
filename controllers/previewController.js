exports.renderPreview = (req, res) => {
    const handle = req.query.handle;
    const decodedSrcs = req.query.srcs.split(',').map(url => decodeURIComponent(url));
    const account = {
        handle,
        imageSources: decodedSrcs
    };
    res.render('preview', { account });
}