import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../../middleware/auth";
import { Leaderboard } from "../../../models/Leaderboard";
import { connectToDB } from "../../../lib/db";

export async function GET(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await connectToDB();
    const allScores = await Leaderboard.find({});
    const formatted: Record<string, Record<string, number>> = {};

    allScores.forEach(doc => {
      formatted[doc.sport] = doc.scores as Record<string, number>;
    });

    return NextResponse.json({ scores: formatted });
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch leaderboard", error: err }, { status: 500 });
  }
}
