import mongoose from "mongoose";

export interface UserType {
  _id: mongoose.Schema.Types.ObjectId
  name: string
  email: string
  bio?: string
  image?: string
  subscribed?: boolean
  stripeCustomerId?: string
  stripeSubscriptionId?: string
  isAdmin?: boolean
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  image: { type: String },
  subscribed: { type: Boolean, default: false },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);