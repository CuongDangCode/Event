import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    req.flash('error', 'Invalid username or password');
    return res.redirect('/login');
  }

  req.session.user = { id: user._id, role: user.role };
  res.redirect(user.role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};
