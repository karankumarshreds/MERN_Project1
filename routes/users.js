const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// used for validation of the incoming data
const { check, validationResult } = require('express-validator');

/************************************
 * @route   POST    /api/users/signup
 * @desc    Register a user
 * @access  Public
 */
router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Minimum length: 6 or more characters').isLength({min:6})
], async (req, res) => {    //async, because we are using try catch
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()})
    }
    //if no errors in request
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if(user){
            res.status(400).json({err: "Email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await user.save();
        res.send('user saved');
    } catch (err) {
        res.status(500).send('Internal server error');
    }
})

module.exports = router;