var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    email: String,
    phone: String,
    role: String,
    address:String,
}, {collection: 'user'});

module.exports = userSchema;
