const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'expense_type',
    new mongoose.Schema(
        {
            title: { type: String, uppercase: true },
            description: String,
            image: String,
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false }
        },
        { timestamps: true, versionKey: false }
    ),
    'expense_type'
);