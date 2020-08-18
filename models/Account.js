const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    handle: {
        type: String,
        trim: true,
        required: 'You must enter an account handle!'
    },
    created: {
        type: Date,
        defaut: Date.now
    },
    imageSources: [String]
});

module.exports = mongoose.model('Account', accountSchema);