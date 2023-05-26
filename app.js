const express =  require('express');
const  router = require('./src/Routes/api');
const app =new express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path= require('path');
// security middleware require
const rateLimit  = require('express-rate-limit')
const mongoSanitize  =require('express-mongo-sanitize');
const cors  =require('cors');
const helmet = require('helmet');
const hpp  =require('hpp');
const xss  =require('xss-clean');




// security middleware implement
app.use(mongoSanitize());

app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(bodyParser.json());
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({limit: '100mb'}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
});





// rateLimit
// const limiter = rateLimit({
//     windowMs: 3 * 60 * 1000, // 15 minutes
//     max:10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })


const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter);


let URI = "mongodb+srv://crud_app:crud_app@cluster0.bth3eqc.mongodb.net/blogsite?retryWrites=true&w=majority"

mongoose.connect(URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Perform any further actions after successful connection
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        // Handle connection error
    });


app.use("/api/v1",router);


// unified  route
app.use('*',(req,res)=>{
    res.status(404).json({status:"fail", data:"Not found"});
});



module.exports =app;