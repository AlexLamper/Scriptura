// components/CreatePostForm.tsx
import React, { useState } from "react";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(""); // This can be a hardcoded value or fetched based on the logged-in user

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      content,
      author, // Pass the author ID here
    };

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const createdPost = await response.json();
      console.log("Post created:", createdPost);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
