
const express = require('express')
const app = express();
const mongoose = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());//req.body




app.get('/',function(req,res){
    res.send('Welcome to my hotel..... How can I help u ')
})




//Import the router file
const personRoutes =require('./routes/personRoutes');
const menuItemRoutes =require('./routes/menuItemRoutes');

// use the router 
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

app.listen(3000,()=>{
    console.log('listening on port 3000');
});

