const mongoose = require('mongoose');
require('dotenv').config();
const Cluster = require('../../app/Models/Cluster');
const { generateMetricArray } = require('../../utils/generateMetricsData');
// Dummy data for clusters
const numDataPoints = 300; // Number of points you want in each array
const clusters = [
  {
    uuid: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Cluster A',
    metrics:  {...generateMetricArray(numDataPoints)},
    iopsRead: 120,
    iopsWrite: 150,
    throughputRead: 220,
    throughputWrite: 250,
  },
  {
    uuid: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Cluster B',
    metrics: {...generateMetricArray(numDataPoints)},
    iopsRead: 130,
    iopsWrite: 160,
    throughputRead: 230,
    throughputWrite: 260,
  }
];

// Function to seed the clusters
const seedClusters = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });

    console.log('Seeding data...');

    // Check if clusters already exist
    const existingClusters = await Cluster.find({});
    if (existingClusters.length > 0) {
      console.log('Clusters already exist in the database. Skipping seeding.');
    } else {
      // Insert dummy data into the Cluster collection
      await Cluster.insertMany(clusters);
      console.log('Cluster data seeded successfully.');
    }

  } catch (error) {
    console.error('Error seeding cluster data:', error);
    await mongoose.connection.close();
  } 
};

// Run the seeder if this file is run directly
if (require.main === module) {
  seedClusters();
}

module.exports = seedClusters;
