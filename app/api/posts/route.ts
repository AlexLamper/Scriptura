// app/api/posts/route.ts
import { connectDB } from "@/lib/connectDB";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, content, author } = await request.json();
    const newPost = new Post({
      title,
      content,
      author,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
