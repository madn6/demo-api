import React, { useState } from 'react';
import API from '../../api.js';

export default function TaskForm() {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		await API.post('/task/create-task', { title, description });
		setTitle('');
		setDescription('');
	};

	return (
		<div className="w-full flex justify-center py-6">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-xl flex flex-col sm:flex-row items-center gap-4 px-4"
			>
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Enter title"
					required
					className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
				/>

				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder="Enter description"
					required
					className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
				/>

				<button
					type="submit"
					className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
				>
					Add Task
				</button>
			</form>
		</div>
	);
}
