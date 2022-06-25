const express = require('express');
const router = express.Router();
const response = require('../../../network/response');
const Controller = require('./controller');

// Routes
router.get('/', getCategories);

function getCategories(req, res, next) {
    Controller().getCategories()
        .then((contacts) => {
            response.success(req, res, contacts, 200);
        })
        .catch(next);
}

module.exports = router;