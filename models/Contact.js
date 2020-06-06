const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name : {type: String, required: true},
    email: {type: String},
    phone: {type: String},
    type: {type: String, default: 'personal'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Contact', contactSchema);

