// console.log('May the server be with you');
// To start the server - npm run dev
// web page is http://127.0.0.1:5500/

// Importing packages

const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

// API Tokens
const API_TOKEN = process.env.MOVIEDB_API_TOKEN;

// DOM and Styling
app.set('view engine', 'ejs');

// ROUTING - For Later
// const hello = require('./routes/hello');

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
		// console.log(data);

		res.render('search-results', { query, results: data.results });
	} catch (error) {
		console.error('Error fetching data:', error);
		res.status(500).json({ error: 'Error fetching data' });
	}
});

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
