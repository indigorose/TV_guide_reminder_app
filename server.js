// console.log('May the server be with you');

// Importing packages

const express = require('express');
require('dotenv').config();
const app = express();
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));
const API_KEY = process.env.MOVIEDB_API_KEY;

const hello = require('./routes/hello');

// Middlewares?
app.use(express.json());

// adding routes
app.use('/hello', hello);

// Fetching API data

const url = 'https://api.themoviedb.org/3/authentication';

fetch(url, options)
	.then((res) => res.json())
	.then((json) => console.log(json))
	.catch((err) => console.error('error:' + err));

// port
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listening on Port: ${port}`));
