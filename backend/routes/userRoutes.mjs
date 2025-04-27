import express from 'express';
import tokenVerification from '../middleware/authMiddleware.mjs';
import { getUsers } from '../controller/userController.mjs';

const router = express.Router();

router.use(tokenVerification);

router.get('/', getUsers);

export default router;
