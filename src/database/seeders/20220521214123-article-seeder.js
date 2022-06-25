'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('articles', [
            {
                name: 'Asus i3',
                description: "Preciosa notebook",
                category_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('articles', null, {});
    }
};
