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
    app.post('/api/course/:courseId/privacy',makeCoursePrivate );
    app.get('/api/course/privacy', getAllPrivateCourses);
    app.delete('/api/course/:courseId/privacy', makeCoursePublic);


    function makeCoursePrivate(req, res) {
        var courseId = req.params['courseId'];
        if (req.session && req.session['user']) {
            var faculty = req.session['user'].username ;
            if(faculty === 'faculty') {

                coursePrivacyModel.makeCoursePrivate(courseId).
                then(record => res.send(record));
            }
            else {
                res.send('Not a faculty');
            }
        } else {
            res.send(null);
        }

    }

    function getAllPrivateCourses(req, res) {
        if (req.session && req.session['user']) {
            var faculty = req.session['user'].username ;
            if(faculty === 'faculty') {

                coursePrivacyModel.getAllPrivateCourses().
                then(courses => res.json(courses));
            }
            else {
                res.send('Not a faculty');
            }
        } else {
            res.send('Not a faculty');
        }

    }

    function makeCoursePublic(req, res) {
        var courseId = req.params['courseId'];
        if (req.session && req.session['user']) {
            var faculty = req.session['user'].username ;
            if(faculty === 'faculty') {

                coursePrivacyModel.makeCoursePublic(courseId).
                then(status => res.json(status));
            }
            else {
                res.send('Not a faculty');
            }
        } else {
            res.send('Not a faculty');
        }

    }

};
