'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [
            {
                name: 'Teconología',
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};
