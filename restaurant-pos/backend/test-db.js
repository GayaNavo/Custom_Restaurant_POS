const mongoose = require('mongoose');
require('dotenv').config();

const testDBConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'restaurant_pos'
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Database: ${conn.connection.name}`);
    console.log(`✅ Connection State: ${conn.connection.readyState}`);
    
    // Try to access a collection
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('📊 Available collections:', collections.map(c => c.name));
    
    // Try to create a test document
    const testSchema = new mongoose.Schema({ test: String });
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({ test: 'Connection test' });
    await testDoc.save();
    console.log('✅ Test document created successfully');
    
    await mongoose.connection.close();
    console.log('✅ Connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Error details:', error);
    process.exit(1);
  }
};

testDBConnection();