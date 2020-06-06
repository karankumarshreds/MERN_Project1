const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({err: "No token, authorization denied"});
    }
    //if there is a token, we need to validate it
    try {
        const decoded = jwt.verify(token, jwtSecret);
        //if valid, the payload object(including token) 
        //will be saved in decoded 
        req.userID = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Token is not valid"
        })
    }
}

module.exports = auth;