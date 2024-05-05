// console.log('May the server be with you');
// Sign into MongoDB before starting so it connects to the server
// To start the server - npm run dev
// To run MongoDB (i.e. the mongod process) as a macOS service, run:

// brew services start mongodb-community@7.0

// To stop a mongod running as a macOS service, use the following command as needed:

// brew services stop mongodb-community@7.0

// The web page is http://127.0.0.1:3000/

// Importing packages
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
dotenv.config({ path: './config.env' });
connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready.'));

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
	console.log(`Server started on port ${PORT}, may the server be with you :)`)
);
