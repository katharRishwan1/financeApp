const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'income',
    new mongoose.Schema(
        {
            expenseType: { type: String, uppercase: true },
            description: String,
            singleAmount: Number,
            count: Number,
            totalAmount: Number,
            atatchMent: String,
            designation: String,
            createAt: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            date: String,
            display: { type: Boolean, default: false },
            isDeleted: { type: Boolean, default: false }
        },
        { timestamps: true, versionKey: false }
    ),
    'income'
);