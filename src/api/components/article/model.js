const {DataTypes} = require('sequelize');
const setupDatabase = require('../../../store/connection');

const ArticleImage =  require('../image/model');
const sequelize = setupDatabase();

const Article = sequelize.define('Article', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
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

Article.ArticleImages = Article.hasMany(ArticleImage, {foreignKey: 'article_id', as: 'articleImages'});
ArticleImage.Article = ArticleImage.belongsTo(Article, {foreignKey: 'article_id', as: 'article'});

module.exports = Article;
