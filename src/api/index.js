const express = require('express');
const http = require('http');

const {api} = require('../config/app.js');
const errors = require('../network/errors');
const networkCategory = require('./components/category/network');
const networkArticle = require('./components/article/network');
const path = require("path");

const app = express();
app.use(express.json());

app.get('/', function(req, res) {
    return res.sendFile(path.join("public", 'index.html'));
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/storage', express.static(path.join(__dirname, 'storage')));

app.use(api.basePath + '/category', networkCategory);
app.use(api.basePath + '/article', networkArticle);

app.use(errors);

const server = http.createServer(app);

server.listen(api.port, function() {
    console.log('Api escuchando en el puerto ', api.port);
});