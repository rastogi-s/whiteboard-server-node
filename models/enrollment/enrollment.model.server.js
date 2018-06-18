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
    removeAllStudentsFromSection:removeAllStudentsFromSection

};

function enrollStudentInSection(sectionId, studentId) {
    return EnrollmentModel.create({section:sectionId,student:studentId, grade:'N.A.'});
}

function findAllSectionsForStudent(studentId) {
    return EnrollmentModel.find({student: studentId}).populate('section').exec();
}


function removeStudentFromSection(sectionId,studentId) {
    return EnrollmentModel.remove({section: sectionId,student:studentId});
}

function removeAllStudentsFromSection(sectionId){
    return EnrollmentModel.remove({section: sectionId});
}

