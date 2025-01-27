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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
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

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);
export const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
