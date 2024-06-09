const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createTaxPayment = Joi.object({
    tax_id: Joi.string().required().error(commonService.getValidationMessage),
    user_id: Joi.string().required().error(commonService.getValidationMessage),
    paidDate: Joi.string().optional().error(commonService.getValidationMessage),
    collectedBy: Joi.string().optional().error(commonService.getValidationMessage),
    amount: Joi.number().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateTaxPayment = Joi.object({
    tax_id: Joi.string().optional().error(commonService.getValidationMessage),
    user_id: Joi.string().optional().error(commonService.getValidationMessage),
    paidDate: Joi.string().optional().error(commonService.getValidationMessage),
    amount: Joi.number().optional().error(commonService.getValidationMessage),
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
    validateCreateTaxPayment: async (dataToValidate) => validateFunc(createTaxPayment, dataToValidate),
    validateUpdateTaxPayment: async (dataToValidate) => validateFunc(updateTaxPayment, dataToValidate),

};
