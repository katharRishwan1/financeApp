const db = {};

db.user = require('./user');
db.role = require('./role');
db.MobileOTPModel = require('./mobile_otp_model');


module.exports = db;