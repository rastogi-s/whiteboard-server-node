var mongoose = require('mongoose');
var coursePrivacySchema = mongoose.Schema({
    courseId: String,
    mode: String,
}, {collection: 'course-privacy'});

module.exports = coursePrivacySchema;
