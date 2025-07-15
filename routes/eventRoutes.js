import express from 'express';
import { listEvents } from '../controllers/eventController.js';
import { ensureAuthenticated, checkRole } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.get('/events', ensureAuthenticated, checkRole('student'), listEvents);
export default router;
