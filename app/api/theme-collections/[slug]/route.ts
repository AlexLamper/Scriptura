import { NextRequest, NextResponse } from "next/server"
import connectMongoDB from "../../../../libs/mongodb"
import ThemeCollection from "../../../../models/ThemeCollection"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB()
    
    const { slug } = await params
    const { searchParams } = new URL(req.url)
    const language = searchParams.get("language") || "en"

    const collection = await ThemeCollection.findOne({ 
      slug, 
      language, 
      isActive: true 
    }).lean()

    if (!collection) {
      return NextResponse.json(
        { error: "Theme collection not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(collection)
  } catch (error) {
    console.error("Error fetching theme collection:", error)
    return NextResponse.json(
      { error: "Failed to fetch theme collection" },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB()
    
    const { slug } = await params
    const data = await req.json()

    const collection = await ThemeCollection.findOneAndUpdate(
      { slug },
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    )

    if (!collection) {
      return NextResponse.json(
        { error: "Theme collection not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(collection)
  } catch (error) {
    console.error("Error updating theme collection:", error)
    return NextResponse.json(
      { error: "Failed to update theme collection" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectMongoDB()
    
    const { slug } = await params

    const collection = await ThemeCollection.findOneAndDelete({ slug })

    if (!collection) {
      return NextResponse.json(
        { error: "Theme collection not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: "Theme collection deleted successfully" })
  } catch (error) {
    console.error("Error deleting theme collection:", error)
    return NextResponse.json(
      { error: "Failed to delete theme collection" },
      { status: 500 }
    )
  }
}
