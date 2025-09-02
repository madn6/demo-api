import Task from '../models/Task.model.js';

export const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({ user: req.userId });
		res.json(tasks);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Failed to fetch tasks' });
	}
};

export const createTask = async (req, res) => {
	try {
		if (!req.body.title) {
			return res.status(400).json({ message: 'Task title is required' });
		}

		const task = await Task.create({ ...req.body, user: req.userId });
		res.status(201).json(task);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Failed to create task' });
	}
};

export const updateTask = async (req, res) => {
	try {
		const task = await Task.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, {
			new: true
		});

		if (!task) {
			return res.status(404).json({ message: 'Task not found or unauthorized' });
		}

		res.json(task);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Failed to update task' });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

		if (!task) {
			return res.status(404).json({ message: 'Task not found or unauthorized' });
		}

		res.json({ message: 'Task deleted' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Failed to delete task' });
	}
};