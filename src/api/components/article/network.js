const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./controller');

// Routes
router.get('/', null, getArticles);
router.post('/', null, create);
router.delete('/:id', null, deleteArticle);

function getArticles(req, res, next) {
    Controller().getArticles()
        .then((contacts) => {
            response.success(req, res, contacts, 200);
        })
        .catch(next);
}

function create(req, res, next) {
    Controller().create(req.body)
        .then(() => {
            res.setHeader("Content-Type", "application/json");
            response.success(req, res, null, 202);
        })
        .catch(next);
}

function deleteArticle(req, res, next) {
    Controller().deleteArticle(req.params.id, req.body)
        .then((algo) => {
            response.success(req, res, algo, 204);
        })
        .catch(next);
}

module.exports = router;