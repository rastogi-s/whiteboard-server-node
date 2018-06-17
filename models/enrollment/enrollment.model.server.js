var mongoose =
    require('mongoose');
var EnrollmentSchema =
    require('./enrollment.schema.server');
var EnrollmentModel = mongoose
    .model('EnrollmentModel', EnrollmentSchema);


module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findAllSectionsForStudent: findAllSectionsForStudent,
    removeStudentFromSection: removeStudentFromSection,

};

function enrollStudentInSection(sectionId, studentId) {
    return EnrollmentModel.create({section:sectionId,student:studentId});
}

function findAllSectionsForStudent(studentId) {
    return EnrollmentModel.find({student: studentId})
}


function removeStudentFromSection(sectionId,studentId) {
    return EnrollmentModel.remove({section: sectionId,student:studentId});
}



