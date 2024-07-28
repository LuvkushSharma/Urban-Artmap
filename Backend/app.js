const express = require('express');
const path = require('path');

const userRoutes = require(path.join(__dirname , '/routes/userRoutes'));
const artworkRoutes = require('./routes/artworkRoutes');
const AppError = require ("./utils/appError");
const globalErrorHandler = require(path.join(__dirname , "/controllers/errorController"));


const cookieParser = require('cookie-parser');

const cors = require('cors');
const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

const corsOptions ={
  origin:'https://crowdsourced-urban-artmap.onrender.com', 
  credentials:true,           
  optionSuccessStatus:200,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
}
app.use(cors(corsOptions));
app.options('*' , cors(corsOptions));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use (express.static (path.join (__dirname , 'public')));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artworks', artworkRoutes);

// All the URL that gonna not handled before , will be handled here.
app.all('*' , (req , res , next) => {
    
    next(new AppError (`Can't find ${req.originalUrl} on this server` , 404));
  })
  
  
  // ----> Global Error Handling Middleware
  app.use(globalErrorHandler);
  
  
module.exports = app;
