import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, unique: true, trim: true, required: true, lowercase: true },
		password: { type: String, required: true, minlength: 6 }
	},
	{ timestamps: true }
);

export default mongoose.model('User', userSchema);
