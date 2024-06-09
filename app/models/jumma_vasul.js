const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'jumma_vasul',
    new mongoose.Schema(
        {
            amount: String,
            date: Date,
            createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            isDeleted: { type: Boolean, default: false },
        },
        { timestamps: true, versionKey: false }
    ),
    'jumma_vasul'
);

