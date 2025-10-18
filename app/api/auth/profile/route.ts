import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../../../middleware/auth";
import { User } from "@/models/user";
import { connectToDB } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await connectToDB();
    const { user } = authResult;
    
    if (!user?.uid) {
      return NextResponse.json({ message: "Invalid user in request" }, { status: 400 });
    }

    const userDoc = await User.findOne({ uid: user.uid });
    if (!userDoc) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      uid: userDoc.uid,
      email: userDoc.email,
      name: userDoc.name,
      provider: userDoc.provider,
      preferredCategories: userDoc.preferredCategories,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch profile", error: error.message }, { status: 500 });
  }
}
