const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/income_type');
const {paginationFn} = require('../utils/commonUtils');
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
            const checkExists = await IncomeType.findOne({ title: req.body.title });
            if (checkExists) {
                return res.success({
                    msg: `Similar data already exists with name ${req.body.title}`,
                });
            }
            const data = await IncomeType.create(req.body);
            if (data && data._id) {
                res.success({
                    msg: `${req.body.title} data created successfully!!!`,
                    result: data
                });
            } else {
                res.success({
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
    getIncomeType: async (req, res) => {
        try {
            const _id = req.params.id;
            const {perPage, currentPage} = req.query
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
            let { rows, pagination } = await paginationFn(
                res,
                db.incomeType,
                filter,
                perPage,
                currentPage
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
            // const getIncomeType = await IncomeType.find(filter);
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
            // const checkUnique = await IncomeType.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            // if (checkUnique) {
            //     return res.clientError({
            //         msg: `${name} this type of role is Already taken`,
            //     });
            // }
            const updData = {};
            Object.keys(req.body).forEach((key) => {
                updData[key] = req.body[key];
            });
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
