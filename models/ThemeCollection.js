import mongoose from "mongoose"

const PassageSchema = new mongoose.Schema({
  book: { type: String, required: true },
  chapter: { type: Number, required: true },
  verses: { type: String, required: true }, // e.g., "1-10" or "5"
  title: { type: String, required: true },
  context: { type: String }, // Brief introduction or context
})

const ThemeCollectionSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    category: { type: String, required: true },
    language: { type: String, required: true, default: "en" },
    difficulty: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
    estimatedDuration: { type: Number, required: true }, // in minutes
    passages: [PassageSchema],
    tags: [String],
    imageUrl: { type: String },
    color: { type: String, default: "#6366f1" }, // Theme color for the collection
    isPremium: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 }, // For sorting collections
  },
  { timestamps: true }
)

export default mongoose.models.ThemeCollection || mongoose.model("ThemeCollection", ThemeCollectionSchema)
