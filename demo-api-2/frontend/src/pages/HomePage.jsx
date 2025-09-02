import React from 'react';
import api from '../lib/api';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../components/Products';

export default function HomePage() {
	const [tasks, setTasks] = useState([]);
	const [newTitle, setNewTitle] = useState('');
	const [editingId, setEditingId] = useState(null);
	const [editingTitle, setEditingTitle] = useState('');

	const navigate = useNavigate();

	const fetchTasks = async () => {
		try {
			const res = await api.get('/api/tasks/get-tasks', { withCredentials: true });
			const data = res.data;
			setTasks(data);
		} catch (err) {
			navigate('/login');
			console.log(err.response?.data?.message || 'fetch failed');
		}
	};

	useEffect(() => {
		fetchTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleAddTask = async () => {
		try {
			await api.post('/api/tasks/create-task', { title: newTitle }, { withCredentials: true });
			setNewTitle('');
			fetchTasks();
		} catch (err) {
			console.log(err.response?.data?.message || 'addd task  failed');
		}
	};

	const handleDelete = async (id) => {
		await api.delete(`/api/tasks/delete-task/${id}`, { withCredentials: true });
		fetchTasks();
	};

	// Toggle completion
	const handleToggleComplete = async (task) => {
		await api.put(
			`/api/tasks/update-task/${task._id}`,
			{ completed: !task.completed },
			{ withCredentials: true }
		);
		fetchTasks();
	};

	// Start editing
	const startEdit = (task) => {
		setEditingId(task._id);
		setEditingTitle(task.title);
	};

	// Save edit
	const saveEdit = async (id) => {
		if (!editingTitle) return;
		await api.put(
			`/api/tasks/update-task/${id}`,
			{ title: editingTitle },
			{ withCredentials: true }
		);
		setEditingId(null);
		setEditingTitle('');
		fetchTasks();
	};

	return (
		<div className="">
			<div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
				<h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

				{/* Add Task */}
				<form className="flex mb-4" onSubmit={handleAddTask}>
					<input
						type="text"
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						className="flex-1 border rounded px-2 py-1 mr-2"
						placeholder="Add new task"
					/>
					<button className="bg-blue-500 text-white px-3 py-1 rounded">Add</button>
				</form>

				{/* Tasks List */}
				{tasks.length > 0 ? (
					<>
						<ul>
							{tasks.map((task) => (
								<li key={task._id} className="flex justify-between items-center mb-2">
									{/* Edit or Display */}
									{editingId === task._id ? (
										<input
											type="text"
											value={editingTitle}
											onChange={(e) => setEditingTitle(e.target.value)}
											className="border rounded px-2 py-1 flex-1 mr-2"
										/>
									) : (
										<span
											onClick={() => handleToggleComplete(task)}
											className={`cursor-pointer flex-1 ${
												task.completed ? 'line-through text-gray-400' : ''
											}`}
										>
											{task.title}
										</span>
									)}

									{/* Buttons */}
									{editingId === task._id ? (
										<>
											<button
												onClick={() => saveEdit(task._id)}
												className="text-green-500 font-bold mr-2"
											>
												Save
											</button>
											<button
												onClick={() => setEditingId(null)}
												className="text-green-500 font-bold mr-2"
											>
												Cancel
											</button>
										</>
									) : (
										<button
											onClick={() => startEdit(task)}
											className="text-yellow-500 font-bold mr-2"
										>
											Edit
										</button>
									)}

									<button onClick={() => handleDelete(task._id)} className="text-red-500 font-bold">
										X
									</button>
								</li>
							))}
						</ul>
					</>
				) : (
					<div className="">no data yet</div>
				)}
			</div>
			<Products />
		</div>
	);
}
