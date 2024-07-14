const AppError = require ('./../utils/appError')

const handleCastErrorDB = (err) => {

     const message = `Invalid ${err.path} : ${err.value}.`
     return new AppError (message , 400); // BAD REQUEST
}


const handleDuplicateFieldsDB = (err) => {
     
    // returns an array
    const value = err.errmsg.
                 match(/(["'])(\\?.)*?\1/);

    const x = value[0];

    const message = `Duplicate field value : ${x}. Please use another value!`

    return new AppError (message , 400);
}


const handleValidationErrorDB = (err) => {
    
    // fetch all the three error objects using map
    const errors = Object.values(err.error).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;

    return new AppError (message , 400);


}


const handleJWTError = err => {

     return new AppError ('Invalid token. Please login again!' , 401);
}


const handleJWTExpiredError = err => {

    return new AppError ('Your Token has expired! Please log in again.' , 401);
}

// run the code in production env

const sendErrorDev = (err , res) => {

    res.status(err.statusCode).json({

        status : err.status,
        error : err, // --------> Complete error
        message : err.message,
        stack : err.stack
    })

}

const sendErrorProd = (err , res) => {
    
    // Operational , trusted error : send message to client in the production env
    if (err.isOperational) {

        res.status(err.statusCode).json({

            status : err.status,
            message : err.message,
            
        })
    } else {

        // 1) Log the error
        console.error('Error 💥' , err);  // for the developer  


        // 2) Send generic message  
        res.status(500).json({

            status : 'error',
            message : 'Something went very wrong'
        })
    }
}

module.exports = (err , req , res , next) => {
    
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    
    if (process.env.NODE_ENV === 'development') {

        sendErrorDev (err , res);

    } else if (process.env.NODE_ENV === 'production') {
        
        let error = {...err};

        if (error.name === 'CastError') {

            error = handleCastErrorDB (error);
        }

        if (error.code === 11000) {

            error = handleDuplicateFieldsDB (error);
        }

        if (error.name === 'ValidationError') {

            error = handleValidationErrorDB (error);
        }

        if (err.name === 'JsonWebTokenError') {

            error = handleJWTError (error);
        }

        if (err.name === 'TokenExpiredError') {

            error = handleJWTExpiredError (error);
        }

        sendErrorProd (error , res);
    }
   
}