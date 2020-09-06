const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User, validate} = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/me',auth, async(req,res)=>{
   const user = await User.findById(req.user._id).select('-password'); //exclude the password
   res.send(user);
});

router.post('/', async(req,res)=>{
    let { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).send('User already registered');
    }

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    
    // const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    const token = user.generateAuthToken();
    // x- is a prefix for the custom headers
    //lodash method to pick properties of objects
    res.header('x-auth-token', token).send(_.pick(user, ['id', 'name', 'email']));
});


module.exports = router;