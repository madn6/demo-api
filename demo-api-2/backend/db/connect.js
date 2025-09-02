import mongoose from "mongoose";


export async function connectDB(uri) {
	if (!uri) throw new Error('uri missing');
	try {
		await mongoose.connect(uri);
		console.log('successfully connected');
	} catch (error) {
		console.error('connection failed', error);
		process.exit(1);
	}
}
