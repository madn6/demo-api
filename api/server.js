import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import './config/back.dotenv.js';
import taskRoutes from './routes/task.routes.js';
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
	origin: 'http://localhost:5173', // ✅ your frontend's origin
	credentials: true               // ✅ allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser())


app.get('/', (req, res) => {
	res.send('api working');
});

app.use('/api/task', taskRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

const PORT = parseInt(process.env.PORT || 5000, 10);

connectDB()
	.then(() => {
		app.listen(PORT, () => {
			console.log(`server is running on http://localhost:${PORT}`);
		});
	})
	.catch((err) => {
		console.error('Database connection failed:', err);
	});
