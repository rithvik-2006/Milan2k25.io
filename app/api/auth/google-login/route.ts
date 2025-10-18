import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../firebase/firebase";
import { User } from "../../../../models/user";
import { connectToDB } from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();
    
    if (!idToken) {
      return NextResponse.json({ message: "ID token required" }, { status: 400 });
    }

    const decodedToken = await auth.verifyIdToken(idToken);
    const email = decodedToken.email;

    if (!email?.endsWith("@iith.ac.in")) {
      return NextResponse.json({ message: "Email must end with @iith.ac.in" }, { status: 403 });
    }

    await connectToDB();
    let user = await User.findOne({ uid: decodedToken.uid });
    if (!user) {
      user = await User.create({
        uid: decodedToken.uid,
        email: decodedToken.email!,
        name: decodedToken.name || "",
        provider: "google",
        preferredCategories: [],
      });
    }

    return NextResponse.json({
      message: "Google login successful",
      uid: user.uid,
      email: user.email,
      name: user.name,
      provider: user.provider,
      preferredCategories: user.preferredCategories,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Google login failed", error: error.message }, { status: 400 });
  }
}
