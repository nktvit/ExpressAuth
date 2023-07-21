const jwt = require('jsonwebtoken');
const config = require('./config');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({error: 'Unauthorized. Please provide a valid JWT token.'});
    }

    jwt.verify(token.replace('Bearer ', ''), config.jwt.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({error: 'Unauthorized. Please provide a valid JWT token.'});
        }

        req.user = decoded;
        next();
    });
};

module.exports = {
    verifyToken,
};
