import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config1.env' });

const protect = asyncHandler(async (req, res, next) => {
	let token;
	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await User.findById(decoded.userId).select('-password');
			next();
		} catch (error) {
			res.statusCode(401);
			throw new Error('Not authorised, invalid token');
		}
	} else {
		res.statusCode(401);
		throw new Error('Not authorised, no token');
	}
});
export { protect };
