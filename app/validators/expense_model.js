const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const create = Joi.object({
    expenseType: Joi.string().required().error(commonService.getValidationMessage),
    singleAmount: Joi.number().optional().error(commonService.getValidationMessage),
    totalAmount: Joi.number().optional().error(commonService.getValidationMessage),
    count: Joi.number().optional().error(commonService.getValidationMessage),
    atatchMent: Joi.string().optional().error(commonService.getValidationMessage),
    designation: Joi.string().optional().error(commonService.getValidationMessage),
    description: Joi.string().optional().error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const update = Joi.object({
    expenseType: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    singleAmount: Joi.number().optional().allow('', null).error(commonService.getValidationMessage),
    totalAmount: Joi.number().optional().allow('', null).error(commonService.getValidationMessage),
    count: Joi.number().optional().allow('', null).error(commonService.getValidationMessage),
    atatchMent: Joi.string().optional().allow('', null).optional().error(commonService.getValidationMessage),
    designation: Joi.string().optional().allow('', null).optional().error(commonService.getValidationMessage),
    description: Joi.string().optional().allow('', null).optional().error(commonService.getValidationMessage),
    date: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);
async function validateFunc(schemaName, dataToValidate) {
    try {
        const { error, value } = schemaName.validate(dataToValidate);
        return {
            error: error ? commonService.convertJoiErrors(error.details) : '',
            validatedData: value,
        };
    } catch (error) {
        return {
            error,
        };
    }
}

module.exports = {
    validateCreateExpense: async (dataToValidate) => validateFunc(create, dataToValidate),
    validateUpdateExpense: async (dataToValidate) => validateFunc(update, dataToValidate),

};
