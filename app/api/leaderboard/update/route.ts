import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../../../middleware/auth";
import { Leaderboard } from "../../../../models/Leaderboard";
import { connectToDB } from "../../../../lib/db";

export async function POST(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  if (!user.isAdmin) {
    return NextResponse.json({ message: "Access denied: Admins only" }, { status: 403 });
  }

  try {
    const { scores, updatedBy } = await req.json();

    if (!scores || typeof scores !== "object") {
      return NextResponse.json({ message: "Invalid scores payload" }, { status: 400 });
    }

    await connectToDB();

    const ops = Object.entries(scores).map(([sport, hostels]) => {
      return Leaderboard.findOneAndUpdate(
        { sport },
        { scores: hostels, updatedBy, updatedAt: new Date() },
        { upsert: true }
      );
    });

    await Promise.all(ops);
    return NextResponse.json({ message: "Leaderboard updated successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Failed to update leaderboard", error: err }, { status: 500 });
  }
}
