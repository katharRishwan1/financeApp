const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/income_type');
const IncomeType = db.incomeType;
module.exports = {
    createIncomeType: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateCreateIncoemType(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            const checkExists = await IncomeType.findOne({ name: req.body.name });
            if (checkExists) {
                return res.clientError({
                    msg: `Similar data already exists with name ${req.body.name}`,
                });
            }
            const data = await IncomeType.create(req.body);
            if (data && data._id) {
                res.clientError({
                    msg: `${req.body.name} data created successfully!!!`,
                });
            } else {
                res.clientError({
                    msg: `${req.body.name} creation failed`,
                });
            }
        } catch (error) {
            console.log('error.status', error);
            if (error.status) {
                if (error.status < 500) {
                    return res.clientError({
                        ...error.error,
                        statusCode: error.status,
                    });
                }
                return res.internalServerError({ ...error.error });
            }
            return res.internalServerError({ error });
        }
    },
    getIncomeType: async (req, res) => {
        try {
            const _id = req.params.id;
            console.log('get role-------', req.decoded);
            const filter = { isDeleted: false };
            if (_id) {
                filter._id = _id;
                const data = await IncomeType.findOne(filter);
                if (data) {
                    return res.success({
                        msg: 'request access',
                        result: data
                    })
                }
                return res.clientError({
                    msg: responseMessages[1012]
                })
            }
            const getIncomeType = await IncomeType.find(filter);
            if (!getRoles.length) {
                res.success({
                    msg: responseMessages[1012],
                    result: getIncomeType,
                });
            } else {
                res.success({
                    msg: 'Roles list',
                    result: getIncomeType,
                });
            }
        } catch (error) {
            console.log('error.status', error);
            if (error.status) {
                if (error.status < 500) {
                    return res.clientError({
                        ...error.error,
                        statusCode: error.status,
                    });
                }
                return res.internalServerError({ ...error.error });
            }
            return res.internalServerError({ error });
        }
    },
    updateIncomeType: async (req, res) => {
        try {
            const { name } = req.body;
            const { error, validateData } = await validator.validateUpdateIncomeType(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            const _id = req.params.id;
            if (!_id) {
                return res.clientError({
                    msg: responseMessages[1015],
                });
            }
            const checkExists = await IncomeType.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const updData = {};
            if (req.body.name) updData.name = req.body.name;
            if (req.body.description) updData.description = req.body.description;
            if (req.body.display) updData.display = req.body.display;
            const checkUnique = await IncomeType.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            if (checkUnique) {
                return res.clientError({
                    msg: `${name} this type of role is Already taken`,
                });
            }

            const data = await IncomeType.updateOne({ _id }, updData);
            if (data.modifiedCount) {
                res.success({
                    result: data,
                    msg: 'Expense Type Updated Successfully',
                });
            } else {
                res.clientError({
                    msg: 'Failed to update Expense Type, pls try again',
                });
            }
        } catch (error) {
            console.log('error.status', error);
            if (error.status) {
                if (error.status < 500) {
                    return res.clientError({
                        ...error.error,
                        statusCode: error.status,
                    });
                }
                return res.internalServerError({ ...error.error });
            }
            return res.internalServerError({ error });
        }
    },
    deleteIncoemType: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.clientError({
                    msg: responseMessages[1015],
                });
            }
            const checkExists = await IncomeType.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const data = await IncomeType.updateOne({ _id }, { isDeleted: true });
            if (data.modifiedCount) {
                res.success({
                    msg: 'deleted successfully',
                    result: data,
                });
            } else {
                res.clientError({
                    msg: 'deletion failed',
                });
            }
        } catch (error) {
            console.log('error.status', error);
            if (error.status) {
                if (error.status < 500) {
                    return res.clientError({
                        ...error.error,
                        statusCode: error.status,
                    });
                }
                return res.internalServerError({ ...error.error });
            }
            return res.internalServerError({ error });
        }
    },
};
