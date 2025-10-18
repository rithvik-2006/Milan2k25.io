import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../../../middleware/auth";
import { User } from "../../../../models/user";
import { connectToDB } from "../../../../lib/db";

export async function POST(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await connectToDB();
    const { user } = authResult;
    const { preferredEventIds } = await req.json();

    if (!Array.isArray(preferredEventIds)) {
      return NextResponse.json({ message: "preferredEventIds must be an array" }, { status: 400 });
    }

    const userDoc = await User.findOneAndUpdate(
      { uid: user.uid },
      { preferredEventIds },
      { new: true }
    );

    if (!userDoc) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Preferences updated", 
      preferredEventIds: userDoc.preferredEventIds 
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to save preferences", error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await connectToDB();
    const { user } = authResult;
    
    const userDoc = await User.findOne({ uid: user.uid });
    if (!userDoc) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ preferredEventIds: userDoc.preferredEventIds || [] });
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to fetch preferences", error: error.message }, { status: 500 });
  }
}
