import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    language: { type: String, required: true }, // Add language field
    category: { type: String, required: true },
    subCategory: { type: String, required: true }, // Add subCategory field
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    questions: [
      {
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    tags: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);