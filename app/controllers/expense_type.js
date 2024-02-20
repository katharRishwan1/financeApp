const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/expense_type');
const ExpenseType = db.expenseType;
module.exports = {
    createExpenseType: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateCreateExpenseType(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            const checkExists = await ExpenseType.findOne({ name: req.body.title });
            if (checkExists) {
                return res.clientError({
                    msg: `Similar  already exists with name ${req.body.title}`,
                });
            }
            const data = await ExpenseType.create(req.body);
            if (data && data._id) {
                res.clientError({
                    msg: `${req.body.title} created successfully!!!`,
                });
            } else {
                res.clientError({
                    msg: `${req.body.title} creation failed`,
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
    getExpenseType: async (req, res) => {
        try {
            const _id = req.params.id;
            console.log('get role-------', req.decoded);
            const filter = { isDeleted: false };
            if (_id) {
                filter._id = _id;
                const data = await ExpenseType.findOne(filter);
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
            const getRoles = await ExpenseType.find(filter);
            if (!getRoles.length) {
                res.success({
                    msg: responseMessages[1012],
                    result: getRoles,
                });
            } else {
                res.success({
                    msg: 'Roles list',
                    result: getRoles,
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
    updateExpenseType: async (req, res) => {
        try {
            const { name } = req.body;
            const { error, validateData } = await validator.validateUpdateExpenseType(req.body);
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
            const checkExists = await ExpenseType.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const updData = {};
            if (req.body.title) updData.title = req.body.title;
            if (req.body.description) updData.description = req.body.description;
            if (req.body.display) updData.display = req.body.display;
            const checkUnique = await ExpenseType.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            if (checkUnique) {
                return res.clientError({
                    msg: `${name} this type of data is Already exist`,
                });
            }

            const data = await ExpenseType.updateOne({ _id }, updData);
            if (data.modifiedCount) {
                res.success({
                    result: data,
                    msg: 'Updated Successfully',
                });
            } else {
                res.clientError({
                    msg: 'Failed to update, pls try again',
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
    deleteExpenseType: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.clientError({
                    msg: responseMessages[1015],
                });
            }
            const checkExists = await ExpenseType.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const data = await ExpenseType.updateOne({ _id }, { isDeleted: true });
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
