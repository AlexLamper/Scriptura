import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "../../../lib/mongodb"
import ThemeCollection from "../../../models/ThemeCollection"
import { defaultThemeCollections } from "../../../lib/themeCollections"

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB()

    const { searchParams } = new URL(req.url)
    const language = searchParams.get("language") || "en"
    const category = searchParams.get("category")
    const difficulty = searchParams.get("difficulty")

    // Build query
    const query: Record<string, string | boolean> = { language, isActive: true }
    
    if (category && category !== "all") {
      query.category = category
    }
    
    if (difficulty && difficulty !== "all") {
      query.difficulty = difficulty
    }

    // Check if we have collections in the database
    const count = await ThemeCollection.countDocuments({ language })
    
    // If no collections exist, seed with default data
    if (count === 0) {
      console.log("No theme collections found, seeding with default data...")
      await ThemeCollection.insertMany(defaultThemeCollections)
    }

    const collections = await ThemeCollection.find(query)
      .sort({ order: 1, createdAt: 1 })
      .lean()

    return NextResponse.json(collections)
  } catch (error) {
    console.error("Error fetching theme collections:", error)
    return NextResponse.json(
      { error: "Failed to fetch theme collections" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB()

    const data = await req.json()
    
    // Validate required fields
    const requiredFields = ["slug", "title", "description", "shortDescription", "category", "passages"]
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Check if slug already exists
    const existing = await ThemeCollection.findOne({ slug: data.slug })
    if (existing) {
      return NextResponse.json(
        { error: "A collection with this slug already exists" },
        { status: 409 }
      )
    }

    const collection = new ThemeCollection(data)
    await collection.save()

    return NextResponse.json(collection, { status: 201 })
  } catch (error) {
    console.error("Error creating theme collection:", error)
    return NextResponse.json(
      { error: "Failed to create theme collection" },
      { status: 500 }
    )
  }
}
