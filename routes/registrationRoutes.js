import express from 'express';
import { registerForEvent, cancelRegistration, listRegistrations } from '../controllers/registrationController.js';
import { ensureAuthenticated, checkRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/register', ensureAuthenticated, checkRole('student'), registerForEvent);
router.post('/cancel', ensureAuthenticated, checkRole('student'), cancelRegistration);
router.get('/admin/registrations', ensureAuthenticated, checkRole('admin'), listRegistrations);

export default router;