import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  registrationDate: { type: Date, default: Date.now }
});


export default mongoose.model('Registration', registrationSchema);
