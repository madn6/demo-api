import React, { useState } from 'react';
import API from '../../api';

export default function LoginForm({ onLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await API.post('/auth/login-user', { email, password }, { withCredentials: true });
			onLogin(); // refresh or redirect
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed');
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow-md">
			<h2 className="text-xl font-bold mb-4">Login</h2>
			{error && <p className="text-red-600 text-sm">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="w-full border px-4 py-2 rounded"
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="w-full border px-4 py-2 rounded"
					required
				/>
				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
				>
					Login
				</button>
			</form>
		</div>
	);
}
