const genresRouter = require('../routes/genres');
const customersRouter = require('../routes/customers');
const moviesRouter = require('../routes/movies');
const rentalRouter = require('../routes/rental');
const usersRouter = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const express = require('express');

module.exports = function(app){    
    app.use(express.json());
    app.use('/api/genres', genresRouter);
    app.use('/api/customers', customersRouter);
    app.use('/api/movies', moviesRouter);
    app.use('/api/rental', rentalRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/auth', auth);
    app.use(error);
}   