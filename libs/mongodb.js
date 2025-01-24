import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } else {
      console.log('MongoDB connection already established');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectMongoDB;
