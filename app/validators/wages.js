const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createWages = Joi.object({
    user: Joi.string().required().error(commonService.getValidationMessage),
    salaryAmount: Joi.required().optional().allow('', null).error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateWages = Joi.object({
    user: Joi.string().optional().error(commonService.getValidationMessage),
    salaryAmount: Joi.optional().optional().allow('', null).error(commonService.getValidationMessage),
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
    validatecreateWages: async (dataToValidate) => validateFunc(createWages, dataToValidate),
    validateUpdateWages: async (dataToValidate) => validateFunc(updateWages, dataToValidate),

};
