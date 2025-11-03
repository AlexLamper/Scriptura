import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // Optional for OAuth users
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    bio: { type: String },
    image: { type: String },
    streak: { type: Number, default: 0 },
    lastStreakDate: { type: Date },
    freezeCount: { type: Number, default: 0 },
    badges: { type: [String], default: [] },
    subscribed: { type: Boolean, default: false },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    isAdmin: { type: Boolean, default: false },
    preferences: {
      language: { type: String },
      translation: { type: String },
      intent: { type: String },
      onboardingCompleted: { type: Boolean, default: false },
      updatedAt: { type: Date }
    },
    lastReadChapter: {
      book: { type: String },
      chapter: { type: Number },
      version: { type: String },
      updatedAt: { type: Date }
    },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
