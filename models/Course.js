import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    theme: { type: String, required: true }, // New field for theme-based filtering
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    totalDuration: { type: Number, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    tags: [String],
    language: { type: String, required: true },
    learning_objectives: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    passages: [{ // New field for related Bible passages
      book: { type: String, required: true },
      chapter: { type: Number, required: true },
      verses: { type: String, required: true }
    }],
    generalInformation: {
      originLanguage: { type: String, required: true },
      author: { type: String, required: true },
      genre: { type: String, required: true },
      chapters: { type: Number, required: true },
      languageDetail: { type: String, required: true },
      timePeriod: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)
