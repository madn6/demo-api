//split token
//verify token
//assign to userId
//pass to next

import { config } from '../config/env.js';
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
	try {
		const token = req.cookies?.token 
		if (!token) return res.status(400).json({ message: 'not found' });

		const decoded = jwt.verify(token, config.JWT_SECRET);

		req.userId = decoded.id;

		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized' });
	}
};
