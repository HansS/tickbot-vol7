import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  hours: Number,
  username: String,
  notes: String,
  project: String,
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Entry', EntrySchema);
