const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('jwtSecret');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).send({err: "No token, authorization denied"});
    }
    //if there is a token, we need to validate it
    try {
        //the payload object(including token) 
        //will be saved in decoded
        const decoded = jwt.verify(token, jwtSecret);
        //extracting instance user id attached
        //in payload and passing it further as:
        req.userID = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({
            error: "Token is not valid"
        })
    }
}

module.exports = auth;
