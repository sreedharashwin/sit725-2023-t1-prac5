let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/api/postCat', function(req,res){
    controller.postCat(req,res);
});

router.get('/api/cats', (req,res)=>{
    controller.getAllCats(req,res);
});

router.delete('/api/removeCat/:catText', (req,res)=>{
    controller.removeCat(req,res);
});

router.get('/',(req,res)=>{
    res.render('indexMongo.html');
})


module.exports = router;