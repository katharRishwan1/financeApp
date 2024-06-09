const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createEbBill = Joi.object({
    amount: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateEbBill = Joi.object({
    amount: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
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
    validatecreateEbBill: async (dataToValidate) => validateFunc(createEbBill, dataToValidate),
    validateUpdateEbBill: async (dataToValidate) => validateFunc(updateEbBill, dataToValidate),

};
