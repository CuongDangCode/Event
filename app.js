import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';

const app = express();

// Middleware xử lý form
app.use(express.urlencoded({ extended: true }));

// Session và flash
app.use(session({ secret: 'secretkey', resave: false, saveUninitialized: true }));
app.use(flash());

// View engine
app.set('view engine', 'ejs');

// Kết nối DB
mongoose.connect('mongodb://localhost:27017/event_management')
  .then(() => console.log('DB connected'));

// Sử dụng các route
app.use(authRoutes);
app.use(eventRoutes);
app.use(registrationRoutes);

// Chạy server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
