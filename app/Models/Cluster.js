const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ClusterSchema = new Schema({
  uuid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  metrics: {
    iops: { type: [Number], required: true },
    throughput: { type: [Number], required: true },
  },
  iopsRead: { type: Number, required: true },
  iopsWrite: { type: Number, required: true },
  throughputRead: { type: Number, required: true },
  throughputWrite: { type: Number, required: true },
}, { 
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
});

module.exports = model('Cluster', ClusterSchema);
