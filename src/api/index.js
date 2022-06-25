const express = require('express');
const http = require('http');

const {api} = require('../config/app.js');
const errors = require('../network/errors');
const networkCategory = require('./components/category/network');
const networkArticle = require('./components/article/network');

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use(api.basePath + '/category', networkCategory);
app.use(api.basePath + '/article', networkArticle);

app.use(errors);

app.configure(function(){
    app.use('/storage', express.static(__dirname + '/storage'));
    app.use(express.static(__dirname + '/public'));
});

const server = http.createServer(app);

server.listen(api.port, function() {
    console.log('Api escuchando en el puerto ', api.port);
});