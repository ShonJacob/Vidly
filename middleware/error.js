const winston = require('winston');

module.exports = function(err,req,res,next){
    // error,warning, info, verbose, debug, silly
    winston.error(err.message, err);
    res.status(500).send('Something failed');
}