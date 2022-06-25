const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./controller');

// Routes
router.get('/', getCategories);
router.post('/', create);
router.delete('/:id', deleteCategory);

function getCategories(req, res, next) {
    Controller().getCategories()
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

function deleteCategory(req, res, next) {
    Controller().deleteCategory(req.params.id, req.body)
        .then((algo) => {
            response.success(req, res, algo, 204);
        })
        .catch(next);
}

module.exports = router;