// console.log('May the server be with you');
// Sign into MongoDB before starting so it connects to the server
// To start the server - npm run dev
// To run MongoDB (i.e. the mongod process) as a macOS service, run:

// brew services start mongodb-community@7.0

// To stop a mongod running as a macOS service, use the following command as needed:

// brew services stop mongodb-community@7.0

// The web page is http://127.0.0.1:3000/

// Importing packages
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const PORT = process.env.PORT;

const app = express();

app.get('/', (req, res) => res.send('Server is ready.'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
