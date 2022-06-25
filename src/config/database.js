module.exports = {
    connections: {
        postgres: {
            "use_env_variable": "DATABASE_URL",
            "dialect": "postgres",
            "dialectOptions": {
                "ssl": {
                    "require": true,
                    "rejectUnauthorized": false
                }
            }
        },
    }
}
