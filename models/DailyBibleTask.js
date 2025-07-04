import mongoose from "mongoose"

const DailyBibleTaskSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true, unique: true },
    passage: { type: String, required: true },
    theme: { type: String, required: true },
    questions: [{ type: String, required: true }],
  },
  { timestamps: true }
)

export default mongoose.models.DailyBibleTask || mongoose.model("DailyBibleTask", DailyBibleTaskSchema)