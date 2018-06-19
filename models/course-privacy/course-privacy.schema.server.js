var mongoose = require('mongoose');
var coursePrivacySchema = mongoose.Schema({
    courseId: String,
    mode: String,
}, {collection: 'courseprivacy'});

module.exports = coursePrivacySchema;
