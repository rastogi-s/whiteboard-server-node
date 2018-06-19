// require express
var express = require('express')
var app = express();

// require body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// require mongoose
var connectionString = 'mongodb://127.0.0.1:27017/course-manager'; // for local
if(process.env.MLAB_USERNAME) { // check if running remotely
    var username = process.env.MLAB_USERNAME; // get from environment
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds163530.mlab.com:63530/heroku_q93w1q4z'; // user yours
}

var mongoose = require('mongoose');
var global = mongoose.connect(connectionString);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected with mongoose');
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var userService = require('./services/user.service.server');
userService(app);
var sectionService = require('./services/section.service.server');
sectionService(app);
var enrollmentService = require('./services/enrollment.service.server');
enrollmentService(app);
var coursePrivacyService = require('./services/course-privacy.service.server');
coursePrivacyService(app);


// var session = require('express-session')
// app.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'any string'
// }));
//
//
// app.get('/', function (req, res) {
//     res.send('Hello World')
// })
//
// app.get('/message/:theMessage', function (req, res) {
//     var theMessage = req.params['theMessage'];
//     res.send(theMessage);
// })
//
// app.get('/api/session/set/:name/:value',
//     setSession);
// app.get('/api/session/get/:name',
//     getSession);


//



// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);


app.listen(5500);