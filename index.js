const express = require('express');
const expressValidator = require('express-validator');
const routers = require('./routers');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const { NODE_ENV, PORT, SECRET_KEY } = require('./constants/config');

app = express();

app.set('port', PORT);
app.use(bodyParser.json({ jsonLimit: '50mb' }));

if (NODE_ENV === 'production') {
    app.use(logger('combined'));
} else {
    app.use(logger('dev'));
}

app.use(cors());
app.use(expressValidator());

app.use('/api', routers);

/**
 * Error handler
 */
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        errors: err.errors
    });
});

const server = app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
