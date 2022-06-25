const coderError = require('../../../utils/coderError');
const { HTTPCodes, ExceptionCode } = require('../../../utils/httpMessages');

const {
    CATEGORY_ATTRIBUTES, ARTICLE_ATTRIBUTES, ARTICLE_IMAGE_ATTRIBUTES
} = require('../../../utils/attributeConstants');

const setupDatabase = require('../../../store/connection');
setupDatabase();

const Article = require('./model');
const Category = require('../category/model');
const ArticleImage = require("../image/model");

module.exports = function () {
	const getArticles = async () => {
		return await Article.findAll({
			attributes: ARTICLE_ATTRIBUTES,
			include: [
				{
					model: Category,
					as: 'category',
					attributes: CATEGORY_ATTRIBUTES,
				},
				{
					model: ArticleImage,
					as: 'articleImages',
					attributes: ARTICLE_IMAGE_ATTRIBUTES,
				}
			]
		});
	};

	const getArticleById = async (id) => {
		if (id) {
			const article = await Article.findOne({
				where: {
					id: id,
				},
				attributes: ARTICLE_ATTRIBUTES,
				include: [
					{
						model: Category,
						as: 'category',
						attributes: CATEGORY_ATTRIBUTES,
					},
					{
						model: ArticleImage,
						as: 'articleImages',
						attributes: ARTICLE_IMAGE_ATTRIBUTES,
					}
				]
			});
			if (article) {
				return article;
			}
			throw coderError(ExceptionCode.ARTICLE_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
		throw coderError(
			ExceptionCode.ARTICLE_ID_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	};

	return {
		getArticles,
		getArticleById,
	};
};
