const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE;
  
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './userFiles');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

const upload = multer({storage: storage}).single('file');

// handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.get('/', function(req, res) {
    res.send('Hello World');
})

app.get('/api/thumbnail-upload', (req, res) => {
    res.send('Hello World')
});

app.post('/api/thumbnail-upload', async (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            console.log(err)
        } else {
            var FileName = req.file.filename;
            res.status(200).send('File Uploaded');
        }
    })
});

const start = async() => {
    try{
        await mongoose.connect(DATABASE);

        app.listen(PORT, () => {
            console.log('Server listening on port ' + PORT);
        });
    } catch(e){
        console.log('Could not connect to database: Message', e.message)
    };
    
};

start();