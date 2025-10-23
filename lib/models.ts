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

export interface QuizType {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  author: string;
  questions: {
    questionText: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const quizSchema = new mongoose.Schema<QuizType>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [{ type: String, required: true }],
      correctAnswer: { type: String, required: true },
      explanation: { type: String },
    },
  ],
  tags: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);