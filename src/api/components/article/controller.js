const log = require('log4js').getLogger('{article/controller}');
const coderError = require('../../../utils/coderError');
const { HTTPCodes, ExceptionCode } = require('../../../utils/httpMessages');

const {
    CATEGORY_ATTRIBUTES, ARTICLE_ATTRIBUTES,
} = require('../../../utils/attributeConstants');

const setupDatabase = require('../../../store/connection');
const sequelize = setupDatabase();

const Article = require('./model');
const Category = require('../category/model');
const CategoryController = require('../category/controller');
const { isEmpty } = require('../../../utils/utils');

module.exports = function () {
	const getArticles = async () => {
		return await Article.findAll({
			attributes: ARTICLE_ATTRIBUTES,
			include: [
				{
					model: Category,
					as: 'category',
					attributes: CATEGORY_ATTRIBUTES,
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
					}
				],
			});
			if (article) {
				return article;
			}
			log.warn(`Article: article not found.`);
			throw coderError(ExceptionCode.ARTICLE_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
		log.warn(`Article: id required.`);
		throw coderError(
			ExceptionCode.ARTICLE_ID_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	};

	const create = async (article) => {
		const t = await sequelize.transaction();
		if (!isEmpty(article) && article.name && article.description) {
			const category = await CategoryController().getCategoryById(
				article.categoryId
			);
			await Article.create({
				name: article.name,
				description: article.description,
				categoryId: category.id,
			});
			return;
		}
		log.warn('Article: data required');
		throw coderError(
			ExceptionCode.ALL_FIELDS_ARE_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	};

	const deleteArticle = async (id) => {
		let article = await getArticleById(id);
		article.deletedAt = Date.now();
		await article.save();
		log.info(`Article: ${id} deleted correctly.`);
	};

	return {
		create,
		getArticles,
		getArticleById,
		deleteArticle
	};
};
