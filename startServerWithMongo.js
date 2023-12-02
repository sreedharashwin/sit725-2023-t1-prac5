let express = require('express');
let app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://localhost:27017";
let port = process.env.port || 3000;
let collection;
var cors = require('cors'); 
app.use(cors());

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db().collection('Cat');
        console.log("Cat collection is " + collection);
    } catch(ex) {
        console.error(ex);
    }
}

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
}

app.listen(port, ()=>{
    console.log('express server started');
    runDBConnection();
});