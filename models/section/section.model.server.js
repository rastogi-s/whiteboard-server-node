var mongoose =
    require('mongoose');
var SectionSchema =
    require('./section.schema.server');
var SectionModel = mongoose
    .model('SectionModel', SectionSchema);


module.exports = {
    findAllSections: findAllSections,
    findAllSectionsForCourse: findAllSectionsForCourse,
    findSectionById: findSectionById,
    createSection: createSection,
    deleteSection: deleteSection,
    updateSection: updateSection,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,

};

function findAllSections() {
    return SectionModel.find();
}

function findAllSectionsForCourse(courseId) {
    return SectionModel.find({courseId: courseId})
}


function findSectionById(sectionId) {
    return SectionModel.findById(sectionId);
}


function createSection(section) {
    return SectionModel.create(section);
}

function deleteSection(sectionId) {
    return SectionModel.remove({_id: sectionId});
}

function updateSection(sectionId, newSection) {
    return SectionModel.update({_id: sectionId},
        {$set: newSection})
}


function decrementSectionSeats(sectionId) {
    return SectionModel.update({
        _id: sectionId
    }, {
        $inc: {availableSeats: -1}
    });
}

function incrementSectionSeats(sectionId) {
    return SectionModel.update({
        _id: sectionId
    }, {
        $inc: {availableSeats: +1}
    });
}


