const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({

    name: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String }

});

module.exports = mongoose.model('User', userSchema);

