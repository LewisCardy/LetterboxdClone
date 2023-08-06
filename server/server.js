const express = require('express');
const app = express();
  
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

app.listen(8080, () => {
    console.log('Server listening on port 8080');
});