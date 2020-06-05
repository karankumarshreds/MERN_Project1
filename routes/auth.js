const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/************************************
 * @route   GET    /api/auth/
 * @desc    Get logged in user
 * @access  Private
 */
router.get('/', (req, res) => {
    res.send('get logged in user');
});

/************************************
 * @route   POST    /api/auth/login
 * @desc    Login user and get token
 * @access  Public
 */
router.post('/login', (req, res) => {
    res.send('User logged in');
})



module.exports = router;