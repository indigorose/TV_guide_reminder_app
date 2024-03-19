// console.log('May the server be with you');
// Sign into MongoDB before starting so it connects to the server
// To start the server - npm run dev
// To run MongoDB (i.e. the mongod process) as a macOS service, run:

// brew services start mongodb-community@7.0

// To stop a mongod running as a macOS service, use the following command as needed:

// brew services stop mongodb-community@7.0

// The web page is http://127.0.0.1:3000/

// Importing packages
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');

var SQLiteStore = require('connect-sqlite3')(session);

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var app = express();

app.locals.pluralize = require('pluralize');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' }),
	})
);
app.use(passport.authenticate('session'));
app.use('/', indexRouter);
app.use('/', authRouter);

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
