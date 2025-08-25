import express from 'express'
import { findUser, login, register } from '../controllers/authControllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/search', verifyToken, findUser)
// protected:
router.get('/dashboard/:id', verifyToken, (req, res) => {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: 'Unauthorized access.' });
    }
  
    res.status(200).json({ message: `Welcome to your dashboard, user ${req.user.id}` });
  });


export default router;