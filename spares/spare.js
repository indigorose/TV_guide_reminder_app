// const express = require('express');
// var expressLayouts = require('express-ejs-layouts');
// const app = express();
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv').config();
// const passport = require('passport');
// const session = require('express-session');
// const UserDetails = require('./userDetails');
// const routes = require('../routes/router');
// const fetch = (...args) =>
// 	import('node-fetch').then(({ default: fetch }) => fetch(...args));

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const { ObjectId } = require('mongodb');

// API Tokens
// const API_TOKEN = process.env.MOVIEDB_API_TOKEN;

// MongoDB Connection
// const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-crud.inopdty.mongodb.net/?retryWrites=true&w=majority`;
// Connecting to MongoDB
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// DOM and Styling
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
// app.use(expressLayouts);
// app.set('layout', './layout/main');
// app.use(bodyParser.json());

// Set up session
// app.use(
// 	session({
// 		secret: process.env.SECRET,
// 		resave: false,
// 		saveUninitialized: true,
// 	})
// );

// Set up passport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(UserDetails.createStrategy());
// passport.serializeUser(UserDetails.serializeUser());
// passport.deserializeUser(UserDetails.deserializeUser());

// app.use(routes);

// MongoClient.connect(connectionString).then((client) => {
// 	console.log('Connected to the Database');
// 	const db = client.db('mediaApiList');
// 	const mediaCollection = db.collection('mediaTitles');
// 	const options = {
// 		method: 'GET',
// 		headers: {
// 			accept: 'application/json',
// 			Authorization: `Bearer ${API_TOKEN}`,
// 		},
// 	};

// 	app.use(bodyParser.urlencoded({ extended: true }));

// 	app.get('/', (req, res) => {
// 		const list = db
// 			.collection('mediaTitles')
// 			.find()
// 			.toArray()
// 			.then((results) => {
// 				res.render('index.ejs', { list: results });
// 			});
// 	});
// 	app.get('/search', async (req, res) => {
// 		try {
// 			const query = req.query.q; // Get the search query from the URL parameter
// 			const url = `https://api.themoviedb.org/3/search/multi?query=${query}`;
// 			const response = await fetch(url, options);
// 			const data = await response.json();
// 			console.log(data);

// 			res.render('search-results', { query, results: data.results });
// 		} catch (error) {
// 			console.error('Error fetching data:', error);
// 			res.status(500).json({ error: 'Error fetching data' });
// 		}
// 	});

// 	app.post('/', async (req, res) => {
// 		try {
// 			const { title, release_date, overview } = req.body;
// 			if (title && title.trim() !== '') {
// 				await mediaCollection.insertOne({
// 					title,
// 					releaseDate: release_date,
// 					overview,
// 				});
// 				db.collection('mediaTitles')
// 					.find()
// 					.toArray()
// 					.then((results) => {
// 						res.render('list.ejs', { mediaTitles: results });
// 					});
// 				console.log('Movie title has been added');
// 			} else {
// 				res.status(400).send('Movie title cannot be empty.');
// 			}
// 		} catch (err) {
// 			console.error(err);
// 			res.status(500).send('Error adding movie to list');
// 		}
// 	});
// 	app.delete('/mediaTitles/:id', (req, res) => {
// 		const movieId = req.params.id;
// 		mediaCollection
// 			.deleteOne({ _id: new ObjectId(`${movieId}`) })
// 			.then((result) => {
// 				if (result.deletedCount === 1) {
// 					res.status(200).json({
// 						message: 'Movie has been deleted.',
// 					});
// 				} else {
// 					res.status(400).json({ message: 'Movie not found.' });
// 				}
// 			})
// 			.catch((error) => console.error(error));
// 	});
// });
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));

UserDetails.register({ username: 'nemo', active: false }, '123');

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

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
// var app = express();

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

module.exports = app;
