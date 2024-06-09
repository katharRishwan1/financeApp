const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/tax_payment_details');
const {paginationFn} = require('../utils/commonUtils');

module.exports = {
    createTaxPayment: async (req, res) => {
        console.log('paymetn-----')
        try {
            const { error, validateData } = await validator.validateCreateTaxPayment(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            // const checkExists = await db.taxPayment.findOne({ name: req.body.title });
            // if (checkExists) {
            //     return res.clientError({
            //         msg: `Similar  already exists with name ${req.body.title}`,
            //     });
            // }
            if(!req.body.paidDate){
                req.body.paidDate = new Date()
            }
            if(!req.body.collectedBy){
                req.body.collectedBy = req.decoded.user_id
            }
            req.body.createBy = req.decoded.user_id
            const findTax = await db.taxMaster.findOne({_id: req.body.tax_id});
            const findUser = await db.user.findOne({_id: req.body.user_id});

            const data = await db.taxPaymet.create(req.body);

            if (data && data._id) {

                const upData = {}
                upData.paidUsers = findTax.paidUsers + 1
                upData.unPaidUsers = findTax.unPaidUsers - 1
                upData.collectedAmount = findTax.collectedAmount + data.amount
                upData.pendingAmount = findTax.totalTargetAmount - upData.collectedAmount

                await db.taxMaster.updateOne({_id: findTax._id}, upData);

                req.body.incomeType = "66620360b450ca9eaaa3e320"
                req.body.giver = data.user_id
                req.body.createdBy = req.decoded.user_id
                req.body.date = moment().format('YYYY-MM-DD')
                req.body.amount = data.amount

                await db.income.create(req.body);

                res.success({
                    msg: `Data created successfully!!!`,
                    result: data
                });
            } else {
                res.success({
                    msg: `creation failed`,
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
    getTaxPayment: async (req, res) => {
        try {
            const _id = req.params.id;
            const {perPage, currentPage} = req.query
            const populateValue = [{path:'tasx_id', select:'tilte'},{path:'user_id', select:'name mobile'}]
            const filter = { isDeleted: false };
            if (_id) {
                filter._id = _id;
                const data = await db.taxPaymet.findOne(filter).populate(populateValue);
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
            // const getTaxPayment = await db.taxPaymet.find(filter);
            let { rows, pagination } = await paginationFn(
                res,
                db.taxPaymet,
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
    updateTaxPayment: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateUpdateTaxPayment(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            console.log('its a demo-------',);
            const _id = req.params.id;
            if (!_id) {
                return res.success({
                    msg: responseMessages[1018],
                });
            }
            const checkExists = await db.taxPaymet.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.success({
                    msg: responseMessages[1012],
                });
            }
            // const checkUnique = await db.taxMaster.findOne({ _id: { $ne: _id }, name, isDeleted: false });
            // if (checkUnique) {
            //     return res.success({
            //         msg: `${name} this type of data is Already exist`,
            //     });
            // }
            const updData = {};
            Object.keys(req.body).forEach((key) => {
                updData[key] = req.body[key];
            });
            const data = await db.taxPaymet.updateOne({ _id }, updData);
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
    deleteTaxPayment: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.success({
                    msg: responseMessages[1018],
                });
            }
            const checkExists = await db.taxPaymet.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.success({
                    msg: responseMessages[1012],
                });
            }
            const data = await db.taxPaymet.updateOne({ _id }, { isDeleted: true });
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
