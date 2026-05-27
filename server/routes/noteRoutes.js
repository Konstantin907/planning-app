import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createNote, getNotesByUser, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

router.post('/new', verifyToken, createNote);
router.put('/:noteId', verifyToken, updateNote);
router.delete('/:noteId', verifyToken, deleteNote);
router.get('/:userId', verifyToken , getNotesByUser);

export default router;