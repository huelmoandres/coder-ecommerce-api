'use strict'

const { Sequelize } = require('sequelize');
const config = require('../database/config');
let sequelize = null;

module.exports = function setupDatabase() {
    if (!sequelize) {
        sequelize = new Sequelize(process.env.DATABASE_URL, {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        });
    }
    return sequelize;
}