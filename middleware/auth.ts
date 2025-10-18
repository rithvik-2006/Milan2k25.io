// middleware/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../firebase/firebase";

const ADMIN_EMAILS = [
  "milan@gymkhana.iith.ac.in",
  "ep23btech11018@iith.ac.in",
  "es23btech11025@iith.ac.in",
  "es24btech11026@iith.ac.in",
];

export interface AuthenticatedUser {
  uid: string;
  email: string | undefined;
  isAdmin: boolean;
  [key: string]: any;
}

// Middleware for App Router
export async function withAuth(req: NextRequest): Promise<{ user: AuthenticatedUser } | NextResponse> {
    const token = req.headers.get("authorization")?.split("Bearer ")[1];
  
    if (!token) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 });
    }
  
    try {
      const decodedToken = await auth.verifyIdToken(token);
  
      if (!decodedToken.email?.endsWith("@iith.ac.in")) {
        return NextResponse.json({ message: "Invalid email domain" }, { status: 403 });
      }
  
      const isAdmin = ADMIN_EMAILS.includes(decodedToken.email);
  
      return {
        user: {
          ...decodedToken,
          email: decodedToken.email ?? undefined,
          isAdmin,
        }
      };
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json({ message: "Invalid token", error }, { status: 401 });
    }
  }
  

// Legacy Pages API support
export function withAuthPagesAPI(handler: any) {
  return async (req: any, res: any) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decodedToken = await auth.verifyIdToken(token);

      if (!decodedToken.email?.endsWith("@iith.ac.in")) {
        return res.status(403).json({ message: "Invalid email domain" });
      }

      const isAdmin = ADMIN_EMAILS.includes(decodedToken.email);

      req.user = { ...decodedToken, isAdmin };
      return handler(req, res);
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid token", error });
    }
  };
}
