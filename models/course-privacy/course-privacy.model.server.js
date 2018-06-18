var mongoose =
    require('mongoose');
var CoursePrivacySchema =
    require('./course-privacy.schema.server');
var CoursePrivacyModel = mongoose
    .model('CoursePrivacyModel', CoursePrivacySchema);


module.exports = {
    makeCoursePrivate: makeCoursePrivate,
    makeCoursePublic:makeCoursePublic,
    getAllPrivateCourses:getAllPrivateCourses

};

function getAllPrivateCourses() {
    return CoursePrivacyModel.find();
}


function makeCoursePrivate(courseId) {
    return CoursePrivacyModel.create({courseId:courseId,mode:'private'});
}

function makeCoursePublic(courseId) {
    return CoursePrivacyModel.remove({courseId: courseId});
}

