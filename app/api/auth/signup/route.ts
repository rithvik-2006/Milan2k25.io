import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../firebase/firebase";
import { User } from "../../../../models/user";
import { connectToDB } from "../../../../lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email?.endsWith("@iith.ac.in")) {
      return NextResponse.json({ message: "Email must end with @iith.ac.in" }, { status: 403 });
    }

    await connectToDB();
    const userRecord = await auth.createUser({ email, password, displayName: name });

    const user = await User.create({
      uid: userRecord.uid,
      email: userRecord.email!,
      name: userRecord.displayName,
      provider: "email",
      preferredCategories: [],
    });

    return NextResponse.json({ 
      message: "Signup successful", 
      uid: user.uid, 
      email: user.email 
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: "Signup failed", error: error.message }, { status: 400 });
  }
}
