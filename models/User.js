import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    bio: { type: String },
    image: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
)

export default mongoose.models.User || mongoose.model("User", UserSchema)
