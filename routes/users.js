const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/************************************
 * @route   POST    /api/users/signup
 * @desc    Register a user
 * @access  Public
 */
router.post('/signup', (req, res) => {
    res.send('Registered the user');
})

module.exports = router;