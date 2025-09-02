import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		completed: { type: Boolean, default: false },
		user: { type: mongoose.Schema.ObjectId, ref: 'User' }
	},
	{ timestamps: true }
);


export default mongoose.model("Task", taskSchema)