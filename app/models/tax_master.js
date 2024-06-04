const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'tax_master',
    new mongoose.Schema(
        {
            title: String,
            description: String,
            collectors: [String], 
            users: [String], 
            amount: Number,
            totalTargetAmount: Number,
            collectedAmount: Number,
            pendingAmount: Number,
            totalUsers: Number,
            paidUsers: Number,
            unPaidUsers: Number,
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false }
        },
        { timestamps: true, versionKey: false }
    ),
    'tax_master'
);




