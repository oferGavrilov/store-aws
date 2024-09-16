import express from 'express';
import { createTask, getTasks, getUserTasks, updateTaskStatus } from '../controllers/taskController';

const router = express.Router();
router.get('/', getTasks);
router.post('/', createTask);
router.patch('/:taskId/status', updateTaskStatus);
router.get("/user/:userId", getUserTasks);

export default router;