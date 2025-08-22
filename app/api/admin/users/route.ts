import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  await connectMongoDB();
  const adminUser = await User.findOne({ email: session.user.email });
  if (!adminUser || !adminUser.isAdmin) {
    return NextResponse.json({ error: "Unauthorized. Admin access required." }, { status: 403 });
  }
  const users = await User.find().lean();
  return NextResponse.json({ users });
}