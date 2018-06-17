module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var enrollmentModel =
        require('./../models/enrollment/enrollment.model.server');

    var sectionModel =
        require('./../models/section/section.model.server');

    // admin access
    app.post('/api/student/:sid/section/:kid',enrollStudentInSection );
    app.get('/api/student/:sid/section', findAllSectionsForStudent);
    app.delete('/api/student/:sid/section/:kid', removeStudentFromSection);

    // logged users
    app.post('/api/section/:kid/enroll', enrollStudent );
    app.get('/api/studentsections', getSections );
    app.delete('/api/section/:kid/unenroll', unEnrollStudent );


    function enrollStudent(req, res) {
        var kid = req.params['kid'];
        if (req.session && req.session['user']) {
           var sid = req.session['user']._id;
            sectionModel
                .decrementSectionSeats(kid)
                .then(function () {
                    return enrollmentModel
                        .enrollStudentInSection(kid ,sid)
                })
                .then(function (enrollment) {
                    res.json(enrollment);
                });
        } else {
            res.send(null);
        }

    }

    function unEnrollStudent(req, res) {
        var kid = req.params['kid'];
        if (req.session && req.session['user']) {
            var sid = req.session['user']._id;
            sectionModel
                .incrementSectionSeats(kid)
                .then(function () {
                    return enrollmentModel.removeStudentFromSection(kid ,sid)
                })
                .then(function (status) {
                    res.json(status);
                });

        } else {
            res.send(null);
        }

    }

    function getSections(req, res) {
        if (req.session && req.session['user']) {
            var sid = req.session['user']._id;
            enrollmentModel.findAllSectionsForStudent(sid)
                .then(function (sections) {
                    res.json(sections);
                });

        } else {
            res.send(null);
        }

    }



    function enrollStudentInSection(req, res) {
        var sid = req.params['sid'];
        var kid = req.params['kid'];
        sectionModel
            .decrementSectionSeats(kid)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(kid ,sid)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            });
    }

    function findAllSectionsForStudent(req, res) {
        var sid = req.params['sid'];
        enrollmentModel.findAllSectionsForStudent(sid)
            .then(function (sections) {
                res.json(sections);
            });
    }

    function removeStudentFromSection(req, res) {
        var kid = req.params['kid'];
        var sid = req.params['sid'];
        sectionModel
            .incrementSectionSeats(kid)
            .then(function () {
                return enrollmentModel.removeStudentFromSection(kid ,sid)
            })
            .then(function (status) {
                res.json(status);
            });

    }

};
