const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'wages',
    new mongoose.Schema(
        {
            user: String,
            salaryAmount: Number,
            date: Date,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'wages'
);

