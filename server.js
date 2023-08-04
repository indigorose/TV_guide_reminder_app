// console.log('May the server be with you');

// Importing packages

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const API_KEY = process.env.MOVIEDB_API_KEY;
const API_TOKEN = process.env.MOVIEDB_API_TOKEN;

app.set('view engine', 'ejs');

// const hello = require('./routes/hello');

// Fetching API data

const url = 'https://api.themoviedb.org/3/search/multi?query=thor';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`,
	},
};

app.get('/search', async (req, res) => {
	try {
		const query = 'Thor'; // Get the search query from the URL parameter

		const response = await fetch(
			`https://api.themoviedb.org/3/search/multi?query=${query}`,
			options
		);
		const data = await response.json();
		console.log(data);

		res.render('search-results', { query, results: data.results });
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
