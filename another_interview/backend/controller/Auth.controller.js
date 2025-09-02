import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const register = async (req, res) => {
   
   try {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
         return res.status(400).json({ message: 'missing field' });
      }

		const existing = await User.findOne({ email });
		if (existing) return res.status(400).json({ message: 'user already exits' });

		const hashed = await bcrypt.hash(password, 10);
		const user = await User.create({ name: name, email: email, password: hashed });

		res.status(200).json({ name: user.name, email: user.email, id: user._id });
	} catch (error) {
		return res.status(400).json({ message: 'server failed ' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Missing email or password' });
		}

		const user = await User.findOne({ email });
		if (!user) return res.status(400).json({ message: 'No user found' });

		const ok = await bcrypt.compare(password, user.password);
		if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '1h' });

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 1000 // 1 hour
		});

		res.json({
			message: 'Login successful',
			user: { id: user._id, name: user.name, email: user.email }
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error', error: error.message });
	}
};

