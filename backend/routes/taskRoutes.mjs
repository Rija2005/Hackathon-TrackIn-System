import express from 'express';
import tokenVerification from '../middleware/authMiddleware.mjs';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from '../controller/taskController.mjs';

const router = express.Router();

router.use(tokenVerification);

router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
