const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createExpense = Joi.object({
    expenseType: Joi.string().required().error(commonService.getValidationMessage),
    atatchMent: Joi.string().optional().error(commonService.getValidationMessage),
    amount: Joi.string().required().error(commonService.getValidationMessage),
    description: Joi.string().optional().error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateExpense = Joi.object({
    expenseType: Joi.string().optional().error(commonService.getValidationMessage),
    atatchMent: Joi.string().optional().error(commonService.getValidationMessage),
    amount: Joi.string().optional().error(commonService.getValidationMessage),
    description: Joi.string().optional().error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
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
    validateCreateExpense: async (dataToValidate) => validateFunc(createExpense, dataToValidate),
    validateUpdateExpense: async (dataToValidate) => validateFunc(updateExpense, dataToValidate),

};
