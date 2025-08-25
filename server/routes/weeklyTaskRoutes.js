import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { getTasks, createTasks, deleteTask, updateTask } from '../controllers/tasksControllers.js';

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.put('/weekly/update/:id',verifyToken, updateTask)
router.post('/weekly/create', verifyToken, createTasks);
router.delete('/weekly/delete', verifyToken, deleteTask);

export default router;