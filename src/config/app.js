require('dotenv').config();

module.exports = {
    api: {
        basePath: process.env.API_BASE_PATH || '/v1',
        port: process.env.API_PORT || 3001,
    },
}