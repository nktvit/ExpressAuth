const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middleware');

// Protected endpoint
router.get('/', verifyToken, (req, res) => {
    return res.json({message: 'Hello'});
});

module.exports = router;
