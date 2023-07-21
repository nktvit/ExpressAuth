const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.status(400).json({error: err.message});
    }

    console.error('Error:', err);
    return res.status(500).json({error: 'Internal server error.'});
};

module.exports = errorHandler;
