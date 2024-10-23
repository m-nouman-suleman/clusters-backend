const { MongoClient } = require('mongodb');
require('dotenv').config();

const connectionString = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;
const collectionsToCreate = ['cluster', 'snapshot'];

let db;
let client;

// Function to connect to MongoDB and create the collections if they don't exist
const connectToMongo = async () => {
  try {
    client = new MongoClient(connectionString);
    
    await client.connect();
    console.log('Connected to MongoDB successfully!');

    // Get the database instance
    db = client.db(dbName);

    // Handle process termination and close the MongoDB connection
    process.on('SIGINT', async () => {
      await closeConnection();
      console.log('MongoDB connection closed due to app termination.');
      process.exit(0);
    });

  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

// Function to get the database connection
const getDb = () => {
  if (!db) {
    throw new Error('Database connection is not established. Call connectToMongo first.');
  }
  return db;
};

// Function to close the MongoDB connection
const closeConnection = async () => {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed.');
  }
};

module.exports = { connectToMongo, getDb, closeConnection };
