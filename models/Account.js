const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    handle: {
        type: String,
        trim: true,
        required: 'You must enter an account handle!',
        validate: /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
    },
    created: {
        type: Date,
        defaut: Date.now
    },
    imageSources: [String]
});

module.exports = mongoose.model('Account', accountSchema);