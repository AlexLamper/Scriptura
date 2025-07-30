import mongoose from "mongoose"

const UserProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    completedContent: [{ type: mongoose.Schema.Types.ObjectId, ref: "CourseContent" }],
    lastAccessedContent: { type: mongoose.Schema.Types.ObjectId, ref: "CourseContent" },
    startedAt: { type: Date, default: Date.now },
    lastAccessedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Create a compound index to ensure a user can only have one progress record per course
UserProgressSchema.index({ user: 1, course: 1 }, { unique: true })

export default mongoose.models.UserProgress || mongoose.model("UserProgress", UserProgressSchema)
