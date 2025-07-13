import { createTask, getTask, updateTask, deleteTask } from "../controllers/task.controller.js";
import { Router } from "express";

const taskRouter = Router()


taskRouter.post('/create-task',createTask)
taskRouter.get('/get-task',getTask)
taskRouter.put('/update-task/:id',updateTask)
taskRouter.delete('/delete-task/:id', deleteTask)



export default taskRouter