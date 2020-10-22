const del = require('del');

exports.renderDownload = (req, res) => {
    const finalImage = req.query.src
    res.render('download', { finalImage });
}

exports.downloadImage = (req,res) => {
    res.download(`public/${req.body.path}`, 'wallpaper.png', function(err){
        if(err){
            console.log(err);
        }else{
            try{
                /*
                revisit below code grabbed from here:
                https://attacomsian.com/blog/nodejs-delete-directory#:~:text=In%20a%20Node.,asynchronously%20to%20remove%20the%20directory.
                */
                const pathToFileArr = `public/${req.body.path}`.split('/');
                const pathToUserDirectory = pathToFileArr.slice(0, pathToFileArr.length -1).join('/');

                (async () => {
                    try {
                        await del(pathToUserDirectory);
                
                        console.log(pathToUserDirectory);
                    } catch (err) {
                        console.error(`Error while deleting.`);
                    }
                })();
            }catch(err){
                console.log(err);
            }
            
        }
    });
};
/*
const deleteImagesAfterDownload = () => {
    fs.readdir('public/images/user-images/', (err, files) =>{
        if (err) throw err;

            for (const file of files) {
                fs.unlink(`public/images/user-images/${file}`, err => {
                    if(err) throw err;
                });
            }
    });
}
*/