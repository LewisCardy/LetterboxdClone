const express = require('express');
const app = express();
  
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//middleware
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './userFiles'
});



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

app.post('/api/thumbnail-upload', multipartMiddleware,(req, res) => {
    console.log(req.body)
    res.json({
        'message': 'File uploaded'
    });
    console.log(req.files.file.path);
});

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});