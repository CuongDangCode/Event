import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  capacity: Number,
  registered: { type: Number, default: 0 }
});

export default mongoose.model('Event', eventSchema);
