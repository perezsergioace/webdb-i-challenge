const express = require('express');

// const db = require('./data/dbConfig.js');
const accountRouter = require('./accounts/accountRouter');

const server = express();

server.use(express.json());
server.use('/api/accounts', accountRouter);

server.get('/', (req, res) => {
    res.send('This is working')
})

module.exports = server;