import mongoose from "mongoose"

const UserThemeProgressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    themeCollectionId: { type: mongoose.Schema.Types.ObjectId, ref: "ThemeCollection", required: true },
    completedPassages: [{ type: Number }], // Array of passage indices that are completed
    currentPassageIndex: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    totalTimeSpent: { type: Number, default: 0 }, // in minutes
    isCompleted: { type: Boolean, default: false },
    notes: { type: String }, // User's overall notes for this theme
  },
  { timestamps: true }
)

// Ensure a user can only have one progress record per theme collection
UserThemeProgressSchema.index({ userId: 1, themeCollectionId: 1 }, { unique: true })

export default mongoose.models.UserThemeProgress || mongoose.model("UserThemeProgress", UserThemeProgressSchema)
