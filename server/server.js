const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const multer  = require('multer')

//environment variables
const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE;

//Route files
const filmsWatchedRoute = require('./routes/filmsWatchedRoutes');

//handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", 
               "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//multer setup
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Store using the original filename
    },
  });

const upload = multer({ storage });



  
//Routes
//default route
app.get('/', function(req, res) {
    res.send('Hello World');
})

//films watched routes
app.use('/films-watched', filmsWatchedRoute);


//Start server if database connection is successfull
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