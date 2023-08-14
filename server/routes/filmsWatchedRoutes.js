const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const multer  = require('multer')

const csv = require('csv-parser')
const fs = require('fs')

const FilmsWatched = require('../models/filmsWatchedModel');

//multer setup
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//Body parser setup
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

//upload file route
router.post('/upload', upload.single('watchlistFile'), async (req, res) => {
    try {
        const results = [];
        fs.createReadStream('../server/uploads/ratings.csv')
        .pipe(csv())
        .on('data', (data) => {
            const filmsWatchedData = {
                date: data.Date,
                filmName: data.Name,
                year: data.Year,
                letterboxdURI: data['Letterboxd URI']
            }
            results.push(filmsWatchedData)
        })
        .on('end', async() => {
            await FilmsWatched.create(results)
            fs.unlinkSync('../server/uploads/ratings.csv');
            res.status(201).send('Watchlist data uploaded successfully');
            console.log('File entered into database')
        });
    
    } catch (err) {
        console.error('Error uploading watchlist data:', err);
        res.status(500).send('Internal Server Error');
    };
});

router.get("/filmsWatched", async(req, res) => {
    try{
        
        const filmsWatched = await FilmsWatched.find();
        res.json(filmsWatched);
        console.log(filmsWatched)
    }catch(e){
        res.send(e)
    }
});

module.exports = router;