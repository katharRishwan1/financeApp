const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'rend_details',
    new mongoose.Schema(
        {
            store_id: { type: mongoose.Schema.Types.ObjectId, ref: 'store_master' },
            month: String,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            date: Date,
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'rend_details'
);

