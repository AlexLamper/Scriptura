import mongoose from "mongoose"

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    // New field for study materials
    studyMaterials: {
      bibleVerses: [
        {
          reference: { type: String, required: true }, // e.g., "John 3:16-17"
          text: { type: String, required: true },
          translation: { type: String, default: "NIV" }, // Bible translation
        },
      ],
      summary: { type: String }, // Optional summary of the key points
      learningObjectives: [String], // What the user should learn from this quiz
    },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String },
        relatedVerses: [String], // References to specific verses related to this question
      },
    ],
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema)

