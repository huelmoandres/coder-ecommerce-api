const {DataTypes} = require('sequelize');
const setupDatabase = require('../../../store/connection');

const sequelize = setupDatabase();

const ArticleImage = sequelize.define('ArticleImage', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "url"
    },
    articleId: {
        type: DataTypes.INTEGER,
        field: "article_id"
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
    tableName: 'article_images'
});

module.exports = ArticleImage;
