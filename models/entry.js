import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  name: String,
  avatar: String,
  hours: Number,
  notes: String,
  project: String,
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', EntrySchema);
