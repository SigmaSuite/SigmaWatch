const express = require('express')

const app = express();

app.listen(4000);
console.log('Listening on port 4000')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');})

app.get('favicon.ico', (req, res) => {
    res.sendFile(__dirname + '/favicon.ico');})