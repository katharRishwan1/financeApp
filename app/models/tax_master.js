const { mongoose } = require('../services/imports');

module.exports = mongoose.model(
    'tax_master',
    new mongoose.Schema(
        {
            title: String,
            description: String,
            collectors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], 
            users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], 
            amount: Number,
            totalTargetAmount: {type: Number, default:0},
            collectedAmount: {type: Number, default:0},
            pendingAmount: {type: Number, default:0},
            totalUsers: {type: Number, default:0},
            paidUsers: {type: Number, default:0},
            unPaidUsers: {type: Number, default:0},
            status: { type: String, enum: ['active', 'inactive'], default: 'active' },
            isDeleted: { type: Boolean, default: false }
        },
        { timestamps: true, versionKey: false }
    ),
    'tax_master'
);




