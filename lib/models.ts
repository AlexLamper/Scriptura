// lib/models.ts
import mongoose from "mongoose";

// Define the shape of the Post document
export interface PostType {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId; // Assuming it's a reference to a User model
  createdAt: Date;
  updatedAt: Date;
}

// Define the Post schema as you've done already
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
