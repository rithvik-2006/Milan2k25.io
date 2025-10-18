import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/middleware/auth";

export async function GET(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  return NextResponse.json({
    message: "Authentication successful",
    user: {
      uid: user.uid,
      email: user.email,
      isAdmin: user.isAdmin,
      name: user.name,
    },
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;
  const body = await req.json();

  return NextResponse.json({
    message: "Authenticated POST request successful",
    user: {
      uid: user.uid,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    receivedData: body,
    timestamp: new Date().toISOString(),
  });
}
