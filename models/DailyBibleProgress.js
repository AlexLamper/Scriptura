import mongoose from "mongoose"

const DailyBibleProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    currentDay: { type: Number, default: 1 },
    lastCompletedAt: { type: Date },
  },
  { timestamps: true }
)

DailyBibleProgressSchema.index({ user: 1 }, { unique: true })

export default mongoose.models.DailyBibleProgress || mongoose.model("DailyBibleProgress", DailyBibleProgressSchema)