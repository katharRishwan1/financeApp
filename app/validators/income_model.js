const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createIncome = Joi.object({
    incomeType: Joi.string().required().error(commonService.getValidationMessage),
    atatchMent: Joi.string().optional().error(commonService.getValidationMessage),
    amount: Joi.string().required().error(commonService.getValidationMessage),
    description: Joi.string().optional().error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateIncome = Joi.object({
    incomeType: Joi.string().required().error(commonService.getValidationMessage),
    atatchMent: Joi.string().optional().error(commonService.getValidationMessage),
    amount: Joi.string().required().error(commonService.getValidationMessage),
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
    validateCreateIncoem: async (dataToValidate) => validateFunc(createIncome, dataToValidate),
    validateUpdateIncome: async (dataToValidate) => validateFunc(updateIncome, dataToValidate),

};
