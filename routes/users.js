const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

// used for validation of the incoming data
const { check, validationResult } = require('express-validator');

/*************************************
 * @route   POST    /api/users/signup
 * @desc    Register a user
 * @access  Public
 * This will login user right away so
 * we will make use of jason web token
 */
router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Minimum length: 6 or more characters').isLength({min:6})
], async (req, res) => {    //async, because we are using try catch
    //returns an array
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({err: errors.array(), response: "fuck"});
    }
    //if no errors in request
    console.log("here??")
    const {name, email, password} = req.body;
    //try working with the db
    try {
        //to check if the email already exists
        let user = await User.findOne({email: email});
        console.log(user);
        if(user){
            console.log("YESSS")
            return res.status(400).send("Email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
        user = new User({
            name: name,
            email: email,
            password: hashedPassword
        });
        await user.save();
        //we want to send a token to login the user
        //payload is an object that will be sent
        const token = jwt.sign(
            { id : user.id },
            jwtSecret,
            { expiresIn: '1h'}
            ) 
        res.status(200).json({
            response: "User created and logged in",
            token: token
        });
    } catch (err) {
        res.status(500).json({err: "Internal server error"});
    }
})

module.exports = router;