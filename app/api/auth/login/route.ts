import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  return NextResponse.json({
    message: "Please login via frontend Firebase SDK to get ID token. Backend cannot verify password directly.",
  }, { status: 400 });
}
