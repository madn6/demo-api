import { connectDB } from './db/connect.js';
import { config } from './config/env.js';
import app from './app.js';

(async () => {
	try {
		await connectDB(config.MONGO_URI);
		app.listen(config.PORT, () => {
			console.log(`api is running on http://localhost:${config.PORT}`);
		});
	} catch (error) {
		console.error('filed to satart a server', error);
		process.exit(1);
	}
})();
