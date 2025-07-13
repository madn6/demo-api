import Task from '../model/task.model.js';

export const createTask = async (req, res) => {
	try {
		const { title, description } = req.body;
		const newTask = await Task.create({ title, description });
		res.status(201).json(newTask);
	} catch (err) {
		res.status(500).json({ error: 'Failed to create task' });
	}
};

export const getTask = async (req, res) => {
	const tasks = await Task.find();
	res.status(200).json(tasks);
};

export const updateTask = async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }); // ✅ fixed
	if (!task) return res.status(404).json({ message: 'Task not found' });
	res.status(200).json(task);
};

export const deleteTask = async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id);
	if (!task) return res.status(404).json({ message: 'Task not found' });
	res.status(200).json(task);
};
