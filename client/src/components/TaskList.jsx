import React, { useEffect, useState } from 'react';
import API from '../../api';

export default function TaskList() {
	const [tasks, setTasks] = useState([]);
	console.log(tasks)

	const fetchTask = async () => {
		const res = await API.get('/task/get-task');
		setTasks(res.data);
	};
	const deleteTask = async (id) => {
		await API.delete(`/task/delete-task/${id}`);
		fetchTask();
	};

	const toggleStatus = async (task) => {
		await API.put(`/task/update-task/${task._id}`, {
			status: task.status === 'pending' ? 'completed' : 'pending'
		});
		fetchTask();
	};

	useEffect(() => {
		fetchTask();
	}, []);

	return (
		<div className="max-w-xl mx-auto mt-6 space-y-4">
			{tasks.map((task) => (
				<li
					key={task._id}
					className="flex justify-between items-center bg-white shadow-md rounded-lg px-4 py-3 border border-gray-200"
				>
					<div>
						<h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
						<p className="text-sm text-gray-500">Status: {task.status}</p>
					</div>

					<div className="flex gap-2">
						<button
							onClick={() => toggleStatus(task)}
							className="px-3 py-1 rounded-md bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
						>
							Mark as {task.status === 'pending' ? 'Completed' : 'Pending'}
						</button>

						<button
							onClick={() => deleteTask(task._id)}
							className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
						>
							Delete
						</button>
					</div>
				</li>
			))}
		</div>
	);
}
