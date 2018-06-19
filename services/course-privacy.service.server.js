module.exports = function (app) {
    var session = require('express-session');
    app.use(session({
        resave: false,
        saveUninitialized: true,
        duration: 30 * 60 * 1000,
        activeDuration: 30 * 60 * 1000,
        secret: 'any string'
    }));

    var coursePrivacyModel =
        require('./../models/course-privacy/course-privacy.model.server');


    // faculty access
    app.post('/api/course/:courseId/privacy', makeCoursePrivate);
    app.get('/api/course/privacy', getAllPrivateCourses);
    app.delete('/api/course/:courseId/privacy', makeCoursePublic);


    function makeCoursePrivate(req, res) {
        console.log('in private');
        var courseId = req.params['courseId'];
        console.log(courseId);
        if (req.session && req.session['user']) {
            var faculty = req.session['user'].username;
            if (faculty === 'faculty') {
                console.log(faculty);
                coursePrivacyModel.makeCoursePrivate(courseId).then(record => res.send(record));
            }
            else {

                res.send(null);
            }
        } else {
            res.send(null);
        }

    }

    function getAllPrivateCourses(req, res) {
        console.log('in get');
        coursePrivacyModel.getAllPrivateCourses().
        then(courses => res.json(courses));
    }

    function makeCoursePublic(req, res) {
        console.log('in public');
        var courseId = req.params['courseId'];
        if (req.session && req.session['user']) {
            var faculty = req.session['user'].username;
            if (faculty === 'faculty') {

                coursePrivacyModel.makeCoursePublic(courseId).then(status => res.json(status));
            }
            else {
                res.send(null);
            }
        } else {
            res.send(null);
        }

    }

};
