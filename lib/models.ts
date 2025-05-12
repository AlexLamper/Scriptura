import mongoose from "mongoose";

export interface CourseType {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  instructor: string;
  lessons: string[];
  totalDuration: number;
  difficulty: string;
  tags: string[];
  language: string;
  learning_objectives: string[];
  imageUrl: string;
  generalInformation: string;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new mongoose.Schema<CourseType>({
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
  instructor: {
    type: String,
    required: true,
  },
  lessons: {
    type: [String],
    required: true,
  },
  totalDuration: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  learning_objectives: {
    type: [String],
    required: true,
  },
  imageUrl: { 
    type: String, 
    required: true 
  },
  generalInformation: {
    type: String,
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

export interface UserType {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  bio?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface PostType {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<PostType>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);
export const User = mongoose.models.User || mongoose.model('User', userSchema);