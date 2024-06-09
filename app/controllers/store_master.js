const responseMessages = require('../middlewares/response-messages');
const db = require('../models');
const validator = require('../validators/store_master');
const {paginationFn} = require('../utils/commonUtils');

module.exports = {
    createStoreMaster: async (req, res) => {
        try {
            const { error, validateData } = await validator.validateCreateStoreMaster(req.body);
            if (error) {
                return res.clientError({
                    msg: error
                })
            }
            const checkExists = await db.storeMaster.findOne({ storeNumber: req.body.storeNumber, ownerName: req.body.ownerName  });
            if (checkExists) {
                return res.clientError({
                    msg: `Similar  already exists with store number ${req.body.storeNumber}`,
                });
            }
            req.body.createdBy = req.decoded.user_id
            const data = await db.storeMaster.create(req.body);
            if (data && data._id) {
                res.success({
                    msg: `data created successfully!!!`,
                    result: data
                });
            } else {
                res.success({
                    msg: ` data creation failed`,
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
    getStoreMaster: async (req, res) => {
        try {
            const _id = req.params.id;
            const {perPage, currentPage} = req.query
            const filter = { isDeleted: false };
            const populateValue = [{path:'ownerName', select:'name mobile'},{path:'createdBy', select:'name mobile'}]
            if (_id) {
                filter._id = _id;
                const data = await db.storeMaster.findOne(filter).populate(populateValue);
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
                db.storeMaster,
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
    updateStoreMaster: async (req, res) => {
        try {
            const { storeNumber, ownerName } = req.body;
            const { error, validateData } = await validator.validateUpdateStoreMaster(req.body);
            if (error) {
                return res.success({
                    msg: error
                })
            }
            const _id = req.params.id;
            if (!_id) {
                return res.success({
                    msg: responseMessages[1015],
                });
            }
            const checkExists = await db.storeMaster.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.success({
                    msg: responseMessages[1012],
                });
            }
            const checkUnique = await db.storeMaster.findOne({ _id: { $ne: _id }, storeNumber, ownerName, isDeleted: false });
            if (checkUnique) {
                return res.clientError({
                    msg: `${storeNumber} this type of data is Already exist`,
                });
            }
            const updData = {};
            Object.keys(req.body).forEach((key) => {
                updData[key] = req.body[key];
            });
            const data = await db.storeMaster.updateOne({ _id }, updData);
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
    deleteStoreMaster: async (req, res) => {
        try {
            const _id = req.params.id;
            if (!_id) {
                return res.success({
                    msg: responseMessages[1015],
                });
            }
            const checkExists = await db.storeMaster.findOne({ _id, isDeleted: false });
            if (!checkExists) {
                return res.success({
                    msg: responseMessages[1012],
                });
            }
            const data = await db.storeMaster.updateOne({ _id }, { isDeleted: true });
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
