"use client";

import React, { useEffect, useState } from "react";
import { PostType } from "@/lib/models"; // Import the PostType

const PostPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]); // Use PostType as the state type

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const posts: PostType[] = await response.json(); // Type the fetched posts
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means it will run once when the component mounts

  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post._id.toString()}> {/* Use toString() to ensure _id is a string */}
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostPage;
