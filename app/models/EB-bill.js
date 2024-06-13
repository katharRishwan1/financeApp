const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'EB-bill',
    new mongoose.Schema(
        {
            title: String,
            amount: Number,
            date: Date,
            numberOfUnit: String,
            attachment: String,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'EB-bill'
);

