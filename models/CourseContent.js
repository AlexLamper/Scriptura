import mongoose from "mongoose";

const CourseContentSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true }, // e.g. "lesson-1" or "psalm-intro"
    order: { type: Number, required: true },
    content: { type: String, required: true }, // Markdown
    duration: { type: Number, required: true },
    resources: [{ type: String }], // Optional: links or PDFs
  },
  { timestamps: true }
);

export default mongoose.models.CourseContent || mongoose.model("CourseContent", CourseContentSchema);
