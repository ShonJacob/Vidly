// const config = require('config');
const coursesRoute = require('./route/courses');
const rootRoute = require('./route/root');
const express = require('express');
const app = express();
const Joi = require('joi');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const morgan = require('morgan');
const startupDebugger = require('debug') ('app:startup');// we get a function and call it app:startup namespace
const dbDebugger = require('debug') ('app:db');
//export/set DEBUG=app:startup

console.log(process.env.NODE_ENV);
console.log(app.get('env'));


app.set('view engine', 'pug'); // will require it internally
app.set('views', './views'); // where to set the view engine


app.use(logger);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use('/api/courses', coursesRoute); // the path and the router object
app.use('/', rootRoute);
//CONFIG
// console.log("Application Name" + config.get('name'));
// console.log("Mail Name" + config.get('mail.host'));
// console.log("Mail password:" + config.get('mail.password'));

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled');
    console.log('morgan');
}


//TEMPLATING ENGINE Pug, Mustache, EJS to return HTMl to client




//PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on ${port} port`);
})