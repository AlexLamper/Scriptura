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
  preferences?: {
    language?: string
    translation?: string
    intent?: string
    onboardingCompleted?: boolean
    fontSize?: string
    fontFamily?: string
    lineHeight?: string
    letterSpacing?: string
    highContrast?: boolean
    showVerseNumbers?: boolean
    updatedAt?: Date
  }
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
  preferences: {
    language: String,
    translation: String,
    intent: String,
    onboardingCompleted: { type: Boolean, default: false },
    fontSize: { type: String, default: "base" },
    fontFamily: { type: String, default: "sans" },
    lineHeight: { type: String, default: "relaxed" },
    letterSpacing: { type: String, default: "normal" },
    highContrast: { type: Boolean, default: false },
    showVerseNumbers: { type: Boolean, default: true },
    updatedAt: Date
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const User = mongoose.models.User || mongoose.model('User', userSchema);