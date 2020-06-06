const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const config = require('config')
const jwtSecret = config.get('jwtSecret');
const auth = require('../middleware/auth');

/************************************
 * @route   GET    /api/auth/
 * @desc    Get logged in user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
    try {
        //collect user details except the password
        const user = await User.findById(req.userID).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({err: "Internal server error"});
    }
});

/************************************
 * @route   POST    /api/auth/login
 * @desc    Login user and get token
 * @access  Public
 */
router.post('/login', [
    check('email','Email ID required').isLength({min:1}),
    check('password', 'Minimum length of password is 8').isLength({min:8})
], async (req, res) => {
    const errors = await validationResult(req);
    if(!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
    }
    //if no error, check if user exists
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email: email});
        if(!user){
            res.status(400).json({error: "Invalid email ID"});
        }
        //validate the password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword){
            return res.status(400).json({error: "Auth failed"});
        }
        //if password is valid
        const token = jwt.sign(
            { id : user.id },
            jwtSecret,
            { expiresIn : '1h'}
        );
        res.status(200).json({
            response: "User logged in",
            token: token
        })     
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})

module.exports = router;