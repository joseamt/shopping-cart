var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
//const bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var userRoutes = require('./routes/user');
var app = express();
let option = {useNewUrlParser: true};
let mongoUri = 'mongodb://shopping:shopping123@ds145951.mlab.com:45951/heroku_90dcq5c7' ||
    'mongodb://localhost:27017/shopping';

mongoose.connect(mongoUri, option);
mongoose.connection.on('connected', function () {
    console.log('MOngodb connection opened');
});
mongoose.connection.on('error', function (err) {
    console.log('MOngodb connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('MOngodb connection disconnected');
});


require('./config/passport');
// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());
app.use(session(
    {
        secret: 'mysupersecret',
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongooseConnection: mongoose.connection}),
        cookie: {maxAge: 180 * 60 * 1000}
    }
));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    next();
});
app.use('/user', userRoutes);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
