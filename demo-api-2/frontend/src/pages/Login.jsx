import React, { useState } from 'react';
import api from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [form, setForm] = useState({
		email: '',
		password: ''
	});
	const [message, setMessage] = useState('');

	console.log('form', form);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await api.post('/api/auth/login', form, { withCredentials: true });

			setMessage('login successful');
			const data = res.data;
			navigate('/');
			console.log('data', data);
		} catch (err) {
			setMessage(err.response?.data?.message || ' login failed');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="w-full max-w-sm bg-white rounded-xl shadow-md p-6">
				<h2 className="text-2xl font-bold text-center mb-4">Login</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={form.email}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
					/>

					<input
						type="password"
						name="password"
						placeholder="Password"
						value={form.password}
						onChange={handleChange}
						required
						className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
					/>

					<button
						type="submit"
						className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
					>
						Login
					</button>
				</form>

				{message && <p className="mt-4 text-center text-sm">{message}</p>}

				<a
					href="/register"
					className="mt-4 block text-center text-sm text-gray-600 hover:text-blue-500"
				>
					Need an account? Register
				</a>
			</div>
		</div>
	);
}
