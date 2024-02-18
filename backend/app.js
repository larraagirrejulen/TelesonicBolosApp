const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;

/*// Load SSL certificate and key
const privateKey = fs.readFileSync('path/to/privatekey.pem', 'utf8');
const certificate = fs.readFileSync('path/to/certificate.pem', 'utf8');

// Create HTTPS server
const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
httpsServer.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));*/

app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
