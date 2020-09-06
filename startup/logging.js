const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function(){
    
//eventlistener for uncaught exceptions
// process.on('uncaughtException', (ex)=>{
//     console.log('UNCAUGHT EXCEPTION');
//     winston.error(ex.message, ex);
// })

winston.handleExceptions(
    new winston.transports.Console({colorize: true, prettyPrint: true}),
    new winston.transports.File({filename: 'unhandledExceptions.log'})
);

process.on('unhandledRejection', (ex)=>{
    throw ex;
});

winston.add(winston.transports.File, { filename: 'logfile.log'});
winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/vidly', level: 'error'});
// winston and other error handling is only in the context of EXPRESS, we need to separately handle other unhandled exceptions that will crash the applciation
}