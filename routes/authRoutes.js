import express from 'express';
import { login, logout } from '../controllers/authController.js';
import { ensureAuthenticated, checkRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') });
});
router.post('/login', login);
router.get('/logout', logout);

router.get('/admin/dashboard', ensureAuthenticated, checkRole('admin'), (req, res) => {
  res.render('adminDashboard');
});
router.get('/student/dashboard', ensureAuthenticated, checkRole('student'), (req, res) => {
  res.render('studentDashboard');
});

export default router;
