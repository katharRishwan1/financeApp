const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'expense',
    new mongoose.Schema(
        {
            expenseType: { type: String, uppercase: true },
            description: String,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            date: String,
            atatchMent: String,
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'expense'
);