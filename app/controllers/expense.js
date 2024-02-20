const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/expense_model');
const Expense = db.expense;
module.exports = {
    createExpense: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateCreateExpense(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            // const checkExists = await Expense.findOne({ name: req.body.name });
            // if (checkExists) {
            //     return res.clientError({
            //         msg: `Similar  already exists with name ${req.body.name}`,
            //     });
            // }
            const data = await Expense.create(req.body);
            if (data && data._id) {
                res.clientError({
                    msg: `${req.body.name} created successfully!!!`,
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
    getExpense: async (req, res) => {
        try {
            const _id = req.params.id;
            console.log('get role-------', req.decoded);
            const filter = { isDeleted: false };
            if (_id) {
                filter._id = _id;
                const data = await Expense.findOne(filter);
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
            const getRoles = await Expense.find(filter);
            if (!getRoles.length) {
                res.success({
                    msg: responseMessages[1012],
                    result: getRoles,
                });
            } else {
                res.success({
                    msg: 'data list',
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
    updateExpense: async (req, res) => {
        try {
            const { name } = req.body;
            const { error, validateData } = await validator.validateUpdateExpense(req.body);
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
            const checkExists = await Expense.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const updData = {};
            if (req.body.name) updData.name = req.body.name;
            if (req.body.description) updData.description = req.body.description;
            if (req.body.display) updData.display = req.body.display;
            // const checkUnique = await Expense.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            // if (checkUnique) {
            //     return res.clientError({
            //         msg: `${name} this type of data is Already exist`,
            //     });
            // }

            const data = await Expense.updateOne({ _id }, updData);
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
    deleteExpense: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.clientError({
                    msg: responseMessages[1015],
                });
            }
            const checkExists = await Expense.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const data = await Expense.updateOne({ _id }, { isDeleted: true });
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
