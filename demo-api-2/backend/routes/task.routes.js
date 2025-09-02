import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controller/task.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const taskRouter = Router();
taskRouter.use(verifyToken); // Apply auth middleware to all routes

taskRouter.get('/get-tasks', getTasks);
taskRouter.post('/create-task', createTask);
taskRouter.put('/update-task/:id', updateTask);
taskRouter.delete('/delete-task/:id', deleteTask);

export default taskRouter;
