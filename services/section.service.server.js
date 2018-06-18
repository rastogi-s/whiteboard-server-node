module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var sectionModel =
        require('./../models/section/section.model.server');

    var enrollmentModel =
        require('./../models/enrollment/enrollment.model.server');


    app.get('/api/section/:sectionId', findSectionById);
    app.get('/api/section', findAllSections);
    app.get('/api/course/:courseId/section', findAllSectionsForCourse);

    // admin access
    app.post('/api/course/:courseId/section', createSection);
    app.put('/api/section/:sectionId', updateSection);
    app.delete('/api/section/:sectionId', deleteSection);


    function createSection(req, res) {
        var section = req.body;
        console.log(section);
        sectionModel.createSection(section)
            .then(function (status) {
                res.send(status);
            });
    }


    function findAllSectionsForCourse(req, res) {
        var courseId = req.params['courseId']
        sectionModel.findAllSectionsForCourse(courseId)
            .then(function (section) {
                res.json(section);
            });
    }

    function findAllSections(req, res) {
        sectionModel.findAllSections()
            .then(function (section) {
                res.json(section);
            });
    }

    function findSectionById(req, res) {
        var sectionId = req.params['sectionId'];
        console.log(sectionId);
        sectionModel.findSectionById(sectionId)
            .then(function (section) {
                res.json(section);
            });
    }


    function updateSection(req, res) {
        var sectionId = req.params['sectionId']
        var newSection = req.body;
        console.log(newSection);
        console.log(sectionId);
        sectionModel.updateSection(sectionId, newSection).then(
            function (status) {
                res.send(status);
            }
        );

    }

    function deleteSection(req, res) {
        var sectionId = req.params['sectionId']
        sectionModel.deleteSection(sectionId).then(() => {
            enrollmentModel.removeAllStudentsFromSection(sectionId).then(
                (status) => res.send(status))

        })

    }

};
