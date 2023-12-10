let collection = require('../model/cat');

const postCat = (req,res) => {
    let cat = req.body;
    collection.postCat(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

const getAllCats = (req,res) => {
    collection.getAllCats((error,result)=>{
        if (!error) {
            res.json({statusCode:200,data:result,message:'success'});
        }
    });
}

const removeCat = (req,res) => {
    let cat = req.params.catText;
    collection.removeCat(cat, (err,result) => {
        if (!err) {
            res.json({statusCode:201,data:result,message:'success'});
        }
    });
}

module.exports = {postCat,getAllCats,removeCat}