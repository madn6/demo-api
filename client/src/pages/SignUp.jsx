import React, { useState } from 'react';
import API from '../../api';

export default function RegisterForm({ onRegister }) {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});
	const [error, setError] = useState('');

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.post('/auth/register-user', formData, { withCredentials: true });
			onRegister(); // Switch to login or main app
		} catch (err) {
			setError(err.response?.data?.message || 'Registration failed');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
			<h2 className="text-xl font-bold mb-4">Sign Up</h2>
			{error && <p className="text-red-600 text-sm">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={formData.name}
					onChange={handleChange}
					className="w-full border px-4 py-2 rounded"
					required
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					className="w-full border px-4 py-2 rounded"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={formData.password}
					onChange={handleChange}
					className="w-full border px-4 py-2 rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}
