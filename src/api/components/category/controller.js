const coderError = require('../../../utils/coderError');
const { HTTPCodes, ExceptionCode } = require('../../../utils/httpMessages');

const {
    CATEGORY_ATTRIBUTES,
} = require('../../../utils/attributeConstants');

const setupDatabase = require('../../../store/connection');
setupDatabase();

const Category = require('./model');

module.exports = function () {
	const getCategories = async () => {
		return await Category.findAll({
			attributes: CATEGORY_ATTRIBUTES,
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

	return {
		getCategoryById,
		getCategories,
	};
};
