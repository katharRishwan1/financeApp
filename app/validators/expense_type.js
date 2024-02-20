const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const create = Joi.object({
    title: Joi.string().required().error(commonService.getValidationMessage),
    description: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    image: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const update = Joi.object({
    title: Joi.string().optional().error(commonService.getValidationMessage),
    description: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    image: Joi.string().optional().error(commonService.getValidationMessage),
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
    validateCreateExpenseType: async (dataToValidate) => validateFunc(create, dataToValidate),
    validateUpdateExpenseType: async (dataToValidate) => validateFunc(update, dataToValidate),

};
