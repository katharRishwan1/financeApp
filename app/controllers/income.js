const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/income_model');
const {paginationFn} = require('../utils/commonUtils');
const Income = db.income;
module.exports = {
    createIncome: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateCreateIncoem(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            // const checkExists = await Income.findOne({ name: req.body.name });
            // if (checkExists) {
            //     return res.clientError({
            //         msg: `Similar data already exists with name ${req.body.name}`,
            //     });
            // }
            const data = await Income.create(req.body);
            if (data && data._id) {
                res.clientError({
                    msg: `${req.body.title} data created successfully!!!`,
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
    getIncome: async (req, res) => {
        try {
            const _id = req.params.id;
            const {perPage, currentPage} = req.query
            const filter = { isDeleted: false };
            const populateValue = [{path:'giver', select:'name mobile'},{path:'createdBy', select:'name mobile'}]
            if (_id) {
                filter._id = _id;
                const data = await Income.findOne(filter).populate(populateValue);
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
            let { rows, pagination } = await paginationFn(
                res,
                db.income,
                filter,
                perPage,
                currentPage,
                populateValue
              );
              if (!rows.length) {
                return res.success({
                  msg: responseMessages[1012],
                });
              } else {
                res.success({
                    msg: responseMessages[1008],
                    result: {rows,pagination}
                });
            }
            // const getIncomeType = await Income.find(filter);
            // if (!getRoles.length) {
            //     res.success({
            //         msg: responseMessages[1012],
            //         result: getIncomeType,
            //     });
            // } else {
            //     res.success({
            //         msg: 'Roles list',
            //         result: getIncomeType,
            //     });
            // }
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
    updateIncome: async (req, res) => {
        try {
            const { name } = req.body;
            const { error, validateData } = await validator.validateUpdateIncome(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            const _id = req.params.id;
            if (!_id) {
                return res.success({
                    msg: responseMessages[1018],
                });
            }
            const checkExists = await Income.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.success({
                    msg: responseMessages[1012],
                });
            }
            // const checkUnique = await Income.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            // if (checkUnique) {
            //     return res.clientError({
            //         msg: `${name} this type of role is Already taken`,
            //     });
            // }
            const updData = {};
            Object.keys(req.body).forEach((key) => {
                updData[key] = req.body[key];
            });
            const data = await Income.updateOne({ _id }, updData);
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
    deleteIncoem: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.clientError({
                    msg: responseMessages[1018],
                });
            }
            const checkExists = await Income.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
            const data = await Income.updateOne({ _id }, { isDeleted: true });
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
