import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../../middleware/auth";

export async function GET(req: NextRequest) {
  const authResult = await withAuth(req);
  
  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const { user } = authResult;

  if (!user.isAdmin) {
    return NextResponse.json({ message: "Access denied: Admins only" }, { status: 403 });
  }

  return NextResponse.json({ message: "Welcome Admin", user });
}
