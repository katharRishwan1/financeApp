const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'expense',
    new mongoose.Schema(
        {
            expenseType: { type: mongoose.Schema.Types.ObjectId, ref: 'expense_type' },
            description: String,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            date: String,
            amount: Number,
            atatchMent: String,
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'expense'
);