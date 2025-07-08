import mongoose from "mongoose"

const connectMongoDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI ?? "")
  }
}

export default connectMongoDB
