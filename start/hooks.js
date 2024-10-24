const { connectToMongo } = require('../database/mongo');
const seedClusters = require('../database/seeders/ClusterSeeder');
const seedSnapshots = require('../database/seeders/SnapshotSeeder');

const runSeeders = async () => {
  try {
    // Connect to MongoDB and set up collections, Ensures collections are created before running seeders
    await connectToMongo();

    // Run the cluster seeder
    await seedClusters();
    console.log('Cluster seeding completed.');

    // Run the snapshot seeder
    await seedSnapshots();
    console.log('Snapshot seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

// Execute the seeders when the server starts
runSeeders().catch((error) => {
  console.error('Error in running seeders:', error);
});
