const {DataTypes} = require('sequelize');
const setupDatabase = require('../../../store/connection');

const Article =  require('../article/model');
const sequelize = setupDatabase();

const Category = sequelize.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'categories'
});

Category.Articles = Category.hasMany(Article, {foreignKey: 'user_id', as: 'articles'});
Article.Category = Article.belongsTo(Category, {foreignKey: 'user_id', as: 'category'});

module.exports = Category;
