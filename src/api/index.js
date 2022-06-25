const express = require('express');
const http = require('http');

const {api} = require('../config/app.js');
const errors = require('../network/errors');
const networkCategory = require('./components/category/network');
const networkArticle = require('./components/article/network');
const path = require("path");

const app = express();
app.use(express.json());

app.use(api.basePath + '/category', networkCategory);
app.use(api.basePath + '/article', networkArticle);

app.use(errors);

app.use(express.static(path.join(__dirname, 'storage'))); //  "public" off of current is root
app.use(express.static(path.join(__dirname, 'public'))); //  "public" off of current is root

const server = http.createServer(app);

server.listen(api.port, function() {
    console.log('Api escuchando en el puerto ', api.port);
});