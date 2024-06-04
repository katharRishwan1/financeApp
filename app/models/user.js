const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'user',
    new mongoose.Schema(
        {
            userName: { type: String, },
            name: { type: String, trim: true },
            email: { type: String, trim: true, lowercase: true },
            mobile: { type: String, trim: true, unique: true },
            alternativeMobileNumber: { type: String, trim: true },
            password: String,
            role: { type: mongoose.Schema.Types.ObjectId, ref: 'role' },
            mobileVerified: {
                type: Boolean,
                default: false,
            },
            emailVerified: {
                type: Boolean,
                default: false,
            },
            areaName: String,
            pin_code: String,
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false },
            adminApproved: { type: String, enum: ['approved', 'pending'], default: 'pending' },
        },
        { timestamps: true, versionKey: false }
    ),
    'users'
);
