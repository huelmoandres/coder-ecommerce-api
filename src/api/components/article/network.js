const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./controller');

// Routes
router.get('/', getArticles);

function getArticles(req, res, next) {
    Controller().getArticles()
        .then((contacts) => {
            response.success(req, res, contacts, 200);
        })
        .catch(next);
}

module.exports = router;