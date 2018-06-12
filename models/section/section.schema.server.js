var mongoose = require('mongoose');
var sectionSchema = mongoose.Schema({
    name: String,
    maxSeats: Number,
    availableSeats: Number,
    courseId: String
}, {collection: 'section'});

module.exports = sectionSchema;
