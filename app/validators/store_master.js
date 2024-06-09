const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createStoreMaster = Joi.object({
    storeNumber: Joi.string().required().error(commonService.getValidationMessage),
    ownerName: Joi.string().required().error(commonService.getValidationMessage),
    mobile: Joi.string().required().error(commonService.getValidationMessage),
    rentAmount: Joi.number().required().error(commonService.getValidationMessage),
    advanceAmount: Joi.number().required().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateStoreMaster = Joi.object({
    storeNumber: Joi.string().optional().error(commonService.getValidationMessage),
    ownerName: Joi.string().optional().error(commonService.getValidationMessage),
    mobile: Joi.string().optional().error(commonService.getValidationMessage),
    rentAmount: Joi.number().optional().error(commonService.getValidationMessage),
    advanceAmount: Joi.number().optional().error(commonService.getValidationMessage),
    status: Joi.string().optional().error(commonService.getValidationMessage),
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
    validateCreateStoreMaster: async (dataToValidate) => validateFunc(createStoreMaster, dataToValidate),
    validateUpdateStoreMaster: async (dataToValidate) => validateFunc(updateStoreMaster, dataToValidate),

};
