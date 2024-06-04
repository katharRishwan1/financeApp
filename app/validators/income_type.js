const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createIncomeType = Joi.object({
    title: Joi.string().required().error(commonService.getValidationMessage),
    description: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    image: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateIncomeType = Joi.object({
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
    validateCreateIncoemType: async (dataToValidate) => validateFunc(createIncomeType, dataToValidate),
    validateUpdateIncomeType: async (dataToValidate) => validateFunc(updateIncomeType, dataToValidate),

};
