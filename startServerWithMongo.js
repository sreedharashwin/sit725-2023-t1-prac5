let express = require('express');
let app = express();
let port = process.env.port || 3000;
require('./dbConnection');
let router = require('./routers/router');
const { Socket } = require('socket.io');
let http = require('http').createServer(app);
let io = require('socket.io')(http);

var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

let path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/',router);

/* 
app.get('/', function (req,res) {
    res.render('indexMongo.html');
});

app.get('/api/cats', (req,res) => {
    getAllCats((err,result)=>{
        console.log(err + " and " + result);
        if (!err) {
            console.log(result);
            res.json({statusCode:200, data:result, message:'get all cats successful'});
        }
    });
});

app.post('/api/cat', (req,res)=>{
    let cat = req.body;
    postCat(cat, (err, result) => {
        if (!err) {
            res.json({statusCode:201, data:result, message:'success'});
        }
    });  
});

function postCat(cat,callback) {
    collection.insertOne(cat,callback).then(function(res, err){
        if(!err)
            callback(err,res);
    });
}

function getAllCats(callback){
    collection.find().toArray().then(function(res, err){
        console.log(res);
        callback(err,res);
    });
} */

app.listen(port, ()=>{
    console.log('express server started');
});