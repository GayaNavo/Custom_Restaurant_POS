const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Parse the connection string to ensure we're connecting to the right database
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant_pos';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Explicitly specify the database name
      dbName: 'restaurant_pos'
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;