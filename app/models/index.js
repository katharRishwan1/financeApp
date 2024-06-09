const db = {};

db.user = require('./user');
db.role = require('./role');
db.MobileOTPModel = require('./mobile_otp_model');
db.expenseType = require('./expense_type');
db.incomeType = require('./income_type');
db.expense = require('./expense_model');
db.income = require('./income_model');
db.taxMaster = require('./tax_master');
db.taxPaymet = require('./tax_payment_details');
db.storeMaster = require('./store_master');
db.rendPaid = require('./rend_paid_details');
db.jummaVasul = require('./jumma_vasul');
db.wages = require('./wages');
db.eb_bill = require('./EB-bill');


module.exports = db;