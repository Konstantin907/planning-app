import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createNote, getNotesByUser } from '../controllers/noteController.js';

const router = express.Router();

router.post('/new', verifyToken, createNote);
router.get('/:userId', verifyToken , getNotesByUser);

export default router;