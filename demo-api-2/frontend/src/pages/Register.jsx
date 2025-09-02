import { useState } from 'react';
import React from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
	const [form, setForm] = useState({ name: '', email: '', password: '' });
	const [message, setMessage] = useState('');

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const navigate = useNavigate();

	console.log('form', form);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await api.post('/api/auth/register', form, { withCredentials: true });

			setMessage('✅ Registration successful!');
			navigate('/');
			console.log('User data:', res.data);
		} catch (err) {
			setMessage(err.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
				<h2 className="text-2xl font-bold text-center mb-4">Register</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={form.name}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={form.email}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
					/>

					<input
						type="password"
						name="password"
						placeholder="Password"
						value={form.password}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
					/>

					<button
						type="submit"
						className="w-full py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
					>
						Register
					</button>
				</form>

				{message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}

				<a
					href="/login"
					className="mt-4 block text-center text-sm text-gray-600 hover:text-green-500"
				>
					Already have an account? Login
				</a>
			</div>
		</div>
	);
}
