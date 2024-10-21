const { MongoClient } = require('mongodb')
const Env = use('Env')

const connectionString = Env.get('MONGO_URL', 'mongodb://localhost:27017')
const dbName = Env.get('DB_NAME', 'cluster_management')
let db

const connectToMongo = async () => {
  try {
    const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    await client.connect()
    console.log('Connected to MongoDB successfully!')

    // Store the database connection
    db = client.db(dbName)
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
  }
}

const getDb = () => {
  if (!db) {
    throw new Error('Database connection is not established. Call connectToMongo first.')
  }
  return db
}

module.exports = { connectToMongo, getDb }
