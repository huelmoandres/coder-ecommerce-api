const log = require('log4js').getLogger('{category/controller}');
const coderError = require('../../../utils/coderError');
const { HTTPCodes, ExceptionCode } = require('../../../utils/httpMessages');

const {
    CATEGORY_ATTRIBUTES, ARTICLE_ATTRIBUTES,
} = require('../../../utils/attributeConstants');

const setupDatabase = require('../../../store/connection');
setupDatabase();

const Category = require('./model');
const { isEmpty } = require('../../../utils/utils');
const Article = require("./model");

module.exports = function () {
	const getCategories = async () => {
		return await Category.findAll({
			attributes: CATEGORY_ATTRIBUTES
		});
	};

	const getCategoryById = async (id) => {
		if (id) {
			const category = await Category.findOne({
				where: {
					id: id
				},
				attributes: CATEGORY_ATTRIBUTES,
			});
			if (category) {
				return category;
			}
			log.warn('Category: category not found');
			throw coderError(ExceptionCode.CATEGORY_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
		log.error('Category: ID is required');
		throw coderError(
			ExceptionCode.CATEGORY_ID_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	};

	const create = async (category) => {
		if (!isEmpty(category) && category.name) {
			const exists = await Category.findOne({
				where: {
					id: category.email
				},
				attributes: CATEGORY_ATTRIBUTES,
			});
			if (!exists) {
				await Category.create({
					name: category.name
				});
				return;
			}
			log.warn('Category: category already exists');
			throw coderError(
				ExceptionCode.CATEGORY_ALREADY_EXISTS,
				HTTPCodes.CONFLICT
			);
		}
		log.warn('Category: data required');
		throw coderError(
			ExceptionCode.ALL_FIELDS_ARE_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	};

	const deleteCategory = async (id) => {
		let category = await getCategoryById(id);
		category.deletedAt = Date.now();
		await category.save();
		log.info(`Category: ${id} deleted correctly.`);
	};

	return {
		create,
		getCategoryById,
		getCategories,
		deleteCategory,
	};
};
