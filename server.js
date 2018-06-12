// require express
var express = require('express')
var app = express();

// require body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// require mongoose
var mongoose = require('mongoose');
var global = mongoose.connect('mongodb://localhost/course-manager');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connected with mongoose');
});


var userService = require('./services/user.service.server');
userService(app);


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