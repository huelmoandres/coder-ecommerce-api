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
			throw coderError(ExceptionCode.CATEGORY_NOT_FOUND, HTTPCodes.NOT_FOUND);
		}
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
			throw coderError(
				ExceptionCode.CATEGORY_ALREADY_EXISTS,
				HTTPCodes.CONFLICT
			);
		}
		throw coderError(
			ExceptionCode.ALL_FIELDS_ARE_REQUIRED,
			HTTPCodes.BAD_REQUEST
		);
	};

	const deleteCategory = async (id) => {
		let category = await getCategoryById(id);
		category.deletedAt = Date.now();
		await category.save();
	};

	return {
		create,
		getCategoryById,
		getCategories,
		deleteCategory,
	};
};
