const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'store_master',
    new mongoose.Schema(
        {
            storeNumber: { type: String },
            ownerName: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            mobile: String,
            rentAmount: String,
            advanceAmount: String,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false }
        },
        { timestamps: true, versionKey: false }
    ),    'store_master'
);

