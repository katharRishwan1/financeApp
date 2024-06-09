const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/tax_master');
const {paginationFn} = require('../utils/commonUtils');
const {roleNames} = require('../config/config')

module.exports = {
    createTaxMaster: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateCreateTaxMaster(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            // const checkExists = await db.taxMaster.findOne({ name: req.body.title });
            // if (checkExists) {
            //     return res.clientError({
            //         msg: `Similar  already exists with name ${req.body.title}`,
            //     });
            // }
            const findRole = await db.role.findOne({name: roleNames.us})
            const getUser = await db.user.find({role: findRole._id, isDeleted: false});
            const user_id = getUser.map((user) => user._id)

            req.body.users = user_id
            req.body.totalTargetAmount = user_id.length * req.body.amount
            req.body.pendingAmount = user_id.length * req.body.amount
            req.body.totalUsers = user_id.length
            req.body.unPaidUsers = user_id.length

            const data = await db.taxMaster.create(req.body);
            if (data && data._id) {
                res.success({
                    msg: `${req.body.title} created successfully!!!`,
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
    getTaxMaster: async (req, res) => {
        try {
            const _id = req.params.id; 
            const {currentPage, perPage} = req.query
            const filter = { isDeleted: false };
            const populateValue = [{path:'users', select:'name mobile'},{path:'collectors', select:'name mobile'}]
            if (_id) {
                filter._id = _id;
                const data = await db.taxMaster.findOne(filter).populate(populateValue);
                if (data) {
                    return res.success({
                        msg: 'request access',
                        result: data
                    })
                }
                return res.success({
                    msg: responseMessages[1012]
                })
            }
            let { rows, pagination } = await paginationFn(
                res,
                db.taxMaster,
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
            // const getRoles = await db.taxMaster.find(filter);
            // if (!getRoles.length) {
            //     res.success({
            //         msg: responseMessages[1012],
            //         result: getRoles,
            //     });
            // } else {
            //     res.success({
            //         msg: 'Roles list',
            //         result: getRoles,
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
    updateTaxMaster: async (req, res) => {
        try {
            const { name } = req.body;
            const { error, validateData } = await validator.validateUpdateTaxMaster(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            const _id = req.params.id;
            if (!_id) {
                return res.clientError({
                    msg: responseMessages[1018],
                });
            }
            const checkExists = await db.taxMaster.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.clientError({
                    msg: responseMessages[1012],
                });
            }
           
            // const checkUnique = await db.taxMaster.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            // if (checkUnique) {
            //     return res.clientError({
            //         msg: `${name} this type of data is Already exist`,
            //     });
            // }
            const updData = {};
            Object.keys(req.body).forEach((key) => {
                updData[key] = req.body[key];
            });
            const data = await db.taxMaster.updateOne({ _id }, updData);
            if (data.modifiedCount) {
                res.success({
                    result: data,
                    msg: 'Updated Successfully',
                });
            } else {
                res.success({
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
    deleteTaxMaster: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.success({
                    msg: responseMessages[1018],
                });
            }
            const checkExists = await db.taxMaster.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.success({
                    msg: responseMessages[1012],
                });
            }
            const data = await db.taxMaster.updateOne({ _id }, { isDeleted: true });
            if (data.modifiedCount) {
                res.success({
                    msg: 'deleted successfully',
                    result: data,
                });
            } else {
                res.success({
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
