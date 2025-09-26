import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGODB_URI);
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectMongoDB;
