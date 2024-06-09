const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'tax_payment_details',
    new mongoose.Schema(
        {
            tasx_id: { type: mongoose.Schema.Types.ObjectId, ref: 'tax_master' },
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            paidDate: Date,
            amount: Number,
            collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            createBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false }
        },
        { timestamps: true, versionKey: false }
    ),
    'tax_payment_details'
);




