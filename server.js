// console.log('May the server be with you');
// To start the server - npm run dev
// The web page is http://127.0.0.1:3000/

// Importing packages

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const MongoClient = require('mongodb').MongoClient;
// require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

// API Tokens
const API_TOKEN = process.env.MOVIEDB_API_TOKEN;

// MongoDB Connection
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster-crud.inopdty.mongodb.net/?retryWrites=true&w=majority`;
// Connecting to MongoDB
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
	(client) => {
		console.log('Connected to the Database');
		const db = client.db('media-api-list');
		const mediaCollection = db.collection('media-titles');

		app.post('/addToList', async (req, res) => {
			try {
				const { title, release_date, overview } = req.body;
				if (title && title.trim() !== '') {
					await mediaCollection.insertOne({
						title,
						releaseDate: release_date,
						overview,
					});
					res.status(201).send('Movie added to the list!');
				} else {
					res.status(400).send('Movie title cannot be empty.');
				}
			} catch (err) {
				console.error(err);
				res.status(500).send('Error adding movie to list');
			}
		});
	}
);

app.use(bodyParser.urlencoded({ extended: true }));

// DOM and Styling
app.set('view engine', 'ejs');

// ROUTING - For Later
// const hello = require('./routes/hello');

MongoClient.connect(connectionString, { useUnifiedTopology: true }).then(
	(client) => {
		console.log('Connected to the database.');
		const db = client.db('media-api-list');
	}
);

// Fetching API data

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`,
	},
};

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/search', async (req, res) => {
	try {
		const query = req.query.q; // Get the search query from the URL parameter
		const url = `https://api.themoviedb.org/3/search/multi?query=${query}`;
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);

		res.render('search-results', { query, results: data.results });
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

// port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
