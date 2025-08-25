import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/weeklyTaskControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.post('/create-task', verifyToken, createTask);
router.put('/update-task', verifyToken, updateTask);
router.delete('/delete', verifyToken, deleteTask);

export default router;