const commonService = require('../services/common_services');
const { Joi } = require('../services/imports');

const createRendPaid = Joi.object({
    store_id: Joi.string().required().error(commonService.getValidationMessage),
    month: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
    date: Joi.string().optional().error(commonService.getValidationMessage),
}).error(commonService.getValidationMessage);

const updateRendPaid = Joi.object({
    store_id: Joi.string().required().error(commonService.getValidationMessage),
    month: Joi.string().optional().allow('', null).error(commonService.getValidationMessage),
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
    validatecreateRendPaid: async (dataToValidate) => validateFunc(createRendPaid, dataToValidate),
    validateUpdateRendPaid: async (dataToValidate) => validateFunc(updateRendPaid, dataToValidate),

};
