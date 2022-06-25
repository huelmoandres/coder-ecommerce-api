const {DataTypes} = require('sequelize');
const setupDatabase = require('../../../store/connection');

const sequelize = setupDatabase();

const Article = sequelize.define('Article', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name"
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name"
    },
    categoryId: {
        type: DataTypes.INTEGER,
        field: "category_id"
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at"
    },
    deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at"
    }
}, {
    defaultScope: {
        where: {
            deletedAt: null,
        },
    },
    sequelize,
    tableName: 'articles'
});

module.exports = Article;
