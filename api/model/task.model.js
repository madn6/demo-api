import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: {type:String},
		status: {
			type: String,
			enum: ['pending', 'complete'],
			default: 'pending'
		}
	},
	{ timestamps: true }
);

export default mongoose.model('Task', taskSchema)
