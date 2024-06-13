const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'jumma_vasul',
    new mongoose.Schema(
        {
            amount: Number,
            date: Date,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'jumma_vasul'
);

