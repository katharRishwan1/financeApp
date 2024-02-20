const db = {};

db.user = require('./user');
db.role = require('./role');
db.MobileOTPModel = require('./mobile_otp_model');
db.expenseType = require('./expense_type');
db.incomeType = require('./income_type');
db.expense = require('./expense_model');
db.income = require('./income_type');


module.exports = db;