// console.log('May the server be with you');

// Importing packages

const express = require('express');
const app = express();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
const dotenv = require('dotenv').config();

const API_KEY = process.env.MOVIEDB_API_KEY;
const API_TOKEN = process.env.MOVIEDB_API_TOKEN;

const hello = require('./routes/hello');

// Fetching API data

const url = 'https://api.themoviedb.org/3/search/multi?query=thor';

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: `Bearer ${API_TOKEN}`,
	},
};

fetch(url, options)
	.then((res) => res.json())
	.then((json) => console.log(json))
	.catch((err) => console.error('error:' + err));

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
