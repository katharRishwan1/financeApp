const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createTaxMaster = Joi.object({
    title: Joi.string().required().error(commonService.getValidationMessage),
    description: Joi.string().optional().error(commonService.getValidationMessage),
    collectors: Joi.array().optional().error(commonService.getValidationMessage),
    users: Joi.array().optional().error(commonService.getValidationMessage),
    amount: Joi.number().optional().error(commonService.getValidationMessage),
    totalTargetAmount: Joi.number().optional().error(commonService.getValidationMessage),
    collectedAmount: Joi.number().optional().error(commonService.getValidationMessage),
    pendingAmount: Joi.number().optional().error(commonService.getValidationMessage),
    totalUsers: Joi.number().optional().error(commonService.getValidationMessage),
    paidUsers: Joi.number().optional().error(commonService.getValidationMessage),
    unPaidUsers: Joi.number().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateTaxMaster = Joi.object({
    title: Joi.string().optional().error(commonService.getValidationMessage),
    description: Joi.string().optional().error(commonService.getValidationMessage),
    collectors: Joi.array().optional().error(commonService.getValidationMessage),
    users: Joi.array().optional().error(commonService.getValidationMessage),
    amount: Joi.number().optional().error(commonService.getValidationMessage),
    totalTargetAmount: Joi.number().optional().error(commonService.getValidationMessage),
    collectedAmount: Joi.number().optional().error(commonService.getValidationMessage),
    pendingAmount: Joi.number().optional().error(commonService.getValidationMessage),
    totalUsers: Joi.number().optional().error(commonService.getValidationMessage),
    paidUsers: Joi.number().optional().error(commonService.getValidationMessage),
    unPaidUsers: Joi.number().optional().error(commonService.getValidationMessage),
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
    validateCreateTaxMaster: async (dataToValidate) => validateFunc(createTaxMaster, dataToValidate),
    validateUpdateTaxMaster: async (dataToValidate) => validateFunc(updateTaxMaster, dataToValidate),

};
