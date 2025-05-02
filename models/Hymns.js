const mongoose = require('mongoose');

const hymnSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['free', 'premium'],
        default: 'free',
    },
    isVisible:{
        type:Boolean,
        enum: [ true, false],
        default: false
    }
}, {
    timestamps: true,
});

const Hymn = mongoose.model('Hymn', hymnSchema);

module.exports = Hymn;
