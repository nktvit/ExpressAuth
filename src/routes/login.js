const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config');
const {Pool} = require('pg');
const {body, validationResult} = require("express-validator");

const router = express.Router();
const pool = new Pool(config.database);

router.post('/',
    [
        body('name').notEmpty().withMessage('Name is required.'),
        body('password').notEmpty().withMessage('Password is required.'),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Throwing a validation error with the error messages reciered from express-validator
            throw {name: 'ValidationError', message: errors.array()};
        }

        const {name, password} = req.body;

        try {
            const userQuery = 'SELECT * FROM users WHERE name = $1';
            const {rows} = await pool.query(userQuery, [name]);
            const user = rows[0];
            if (!user) {
                return res.status(401).json({ error: 'User not found.' });
            }
            //console.log('Input password:', password);
            const expectedHash = await bcrypt.hash(password, 10);
            //console.log('Expected hash:', expectedHash);
            //console.log('Stored hash:', user.password);
            const passwordMatch = await bcrypt.compare(password, user.password);
            //console.log('Password match:', passwordMatch);

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials. Please check your name and password.' });
            }
            const token = jwt.sign({name: user.name}, config.jwt.secretKey, {expiresIn: config.jwt.expiresIn});

            return res.json({token});
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).json({error: 'Internal server error.'});
        }
    });

module.exports = router;
