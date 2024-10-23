const mongoose = require('mongoose');
const { Schema } = mongoose;

// Snapshot schema
const SnapshotSchema = new Schema({
  id: { type: String, required: true, unique: true },
  policyName: { type: String, required: true },
  directory: { type: String, required: true },
  scheduleType: { type: String, required: true },
  time: { type: String, required: true },
  days: [{ type: String, required: true }],
  deleteAfter: { type: String, required: true },
  locked: { type: Boolean, required: true, default: false },
  enabled: { type: Boolean, required: true, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Snapshot', SnapshotSchema);
