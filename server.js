const express = require('express');
const app = express();
const winston = require('winston');
const { describe } = require('joi');
const { iteratee } = require('lodash');
const { request } = require('express');

require('./startup/logging')();// called when there is an exception
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);


const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));


//authentication is to verify identity
//authorization is to determine access/permission

//all validations and DB calls are defined in the Model, and the routes call the Mongoose operations
// custom-environment-variables.json is a mipping between config and environment variables


//unit test, integration test and end-to-end test
// describe('/api/genres', ()=>{
//     const request = require('supertest');
//     let server;
//     beforeEach(()=>{server = require('../../index.js')})
//     afterEach(()=>{server.close()})

//     describe('GET /', ()=>{
//         iteratee('should return all genres', async ()=>{
//             const res  = await request(server).get('/api/genres');
//             expect(res.status).toBe(200);
//              expect(res.body.some(g=>g.name === 'genres1')).toBeTruthy();
//         }
//     }
// })