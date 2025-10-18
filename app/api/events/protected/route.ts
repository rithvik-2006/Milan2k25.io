//events/protected/route.ts
import { NextRequest, NextResponse } from "next/server";
import Event from "../../../../models/Event";
import { withAuth } from "../../../../middleware/auth";
import { connectToDB } from "../../../../lib/db";

export async function GET(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    await connectToDB();
    const events = await Event.find({}).sort({ date: 1, startTime: 1 });
    return NextResponse.json(events);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Failed to fetch events", error: error.message }, { status: 500 });
  }
}
