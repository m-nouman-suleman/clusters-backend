const mongoose = require('mongoose');
require('dotenv').config();
const Snapshot = require('../../app/Models/Snapshot');

// Dummy data for snapshots
const snapshots = [
  {
    id: 'snapshot-001',
    policyName: 'Daily Backup',
    directory: '/data/backup/daily',
    scheduleType: 'daily',
    time: '02:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    deleteAfter: '7 days',
    locked: false,
    enabled: true,
  },
  {
    id: 'snapshot-002',
    policyName: 'Weekly Full Backup',
    directory: '/data/backup/weekly',
    scheduleType: 'weekly',
    time: '03:00',
    days: ['Sunday'],
    deleteAfter: '30 days',
    locked: false,
    enabled: true,
  },
  {
    id: 'snapshot-003',
    policyName: 'Monthly Audit Backup',
    directory: '/data/backup/monthly',
    scheduleType: 'monthly',
    time: '04:00',
    days: ['1'],
    deleteAfter: '365 days',
    locked: true,
    enabled: true,
  }
];

// Function to seed the snapshots
const seedSnapshots = async () => {
  try {
    // Connect to MongoDB using Mongoose's built-in connection
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log('Seeding snapshot data...');

    // Check if snapshots already exist
    const existingSnapshots = await Snapshot.find({});
    if (existingSnapshots.length > 0) {
      console.log('Snapshots already exist in the database. Skipping seeding.');
    } else {
      // Insert dummy data into the Snapshot collection
      await Snapshot.insertMany(snapshots);
      console.log('Snapshot data seeded successfully.');
    }

  } catch (error) {
    console.error('Error seeding snapshot data:', error);
  } finally {
    await mongoose.connection.close();
  }
};

// Run the seeder if this file is run directly
if (require.main === module) {
  seedSnapshots();
}

module.exports = seedSnapshots;
