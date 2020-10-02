const express = require("express");
const mongoose= require('mongoose');
const compression = require('compression')
const keys= require('./config/keys');
const cookieSession= require('cookie-session');
const passport = require('passport');
const bodyParser= require('body-parser');
const dataStore = require('nedb')
const products = new dataStore('products.db');
const app= express();
products.loadDatabase()
app.use(express.json({limit:'1mb'}))
app.use(compression());
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(bodyParser.json())
require('./models/User');
require('./models/Survey')
require('./passport/passport');
mongoose.connect(keys.mongoURI,{useNewUrlParser:true});
// maxAge is 30 days, 24 hour, 60 minutes, 60 seconds, and 1000 miliseconds
app.use(cookieSession({
  maxAge: 30*24*60*60*1000,
  keys:[keys.cookieKey] 
}))
app.use(passport.initialize());
app.use(passport.session());
require('./routes/authRoute')(app);
require('./routes/billingRoute')(app);
require('./routes/serveyRoute')(app);
require('./routes/productsRoute')(app,products)

if(process.env.NODE_ENV==='production'){
   app.use(express.static('client/build'));
   const path=require('path');
   app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
   })
}
const PORT = process.env.PORT || 4000;
app.listen(PORT);



