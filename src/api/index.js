const express = require('express');
const fs = require('fs');
const http = require('http');
const log4js = require('log4js');

const {api} = require('../config/app.js');
const errors = require('../network/errors');
const networkCategory = require('./components/category/network');
const networkArticle = require('./components/article/network');

/**
 * make a log directory, just in case it isn't there.
 * https://github.com/log4js-node/log4js-example
 */
try {
    fs.mkdirSync('../../log');
} catch (e) {
    if (e.code !== 'EEXIST') {
        console.log('No se pudo configurar el directorio para el log, [ERROR]: ', e);
        process.exit(1);
    }
}

/**
 * Initialise log4js first, so we don't miss any log messages
 */

log4js.configure('./src/config/log4js.json'); //ruta relativa a la raíz de la aplicación
const log = log4js.getLogger('index startup');

const app = express();
app.use(express.json());

app.use(api.basePath + '/category', networkCategory);
app.use(api.basePath + '/article', networkArticle);

app.use(errors);

const server = http.createServer(app);

server.listen(api.port, function() {
    console.log('Api escuchando en el puerto ', api.port);
    log.info('Express server listening on port ',  api.port);
});