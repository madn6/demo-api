import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';

export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'All fields are required.' });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ message: 'Email already in use.' });
		}

		const hash = await bcrypt.hash(password, 10);
		const user = await User.create({ name, email, password: hash });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // fixed typo: '1hr' → '1h'

		res.cookie('token', token, {
			httpOnly: true,
			secure: false, // true in production
			sameSite: 'Lax', // fixed casing: 'lax' → 'Lax'
			maxAge: 3600000 // 1 hour
		});

		res.status(201).json({
			message: 'User registered and logged in.'
		});
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).json({ message: 'Server error. Please try again later.' });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Email and password are required.' });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: 'Invalid credentials.' });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.cookie('token', token, {
			httpOnly: true,
			secure: false,
			sameSite: 'Lax',
			maxAge: 3600000
		});

		res.status(201).json({
			message: 'User registered and logged in.'
		});
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error.' });
	}
};
