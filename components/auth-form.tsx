"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { toast } from "@/hooks/use-toast"

export function AuthForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const loginWithGoogle = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      // Check if email ends with @iith.ac.in
      if (!user.email?.endsWith("@iith.ac.in")) {
        await auth.signOut()
        toast({
          title: "Invalid Email",
          description:
            "Your Google email is not a valid IITH email. Please use an email ending with @iith.ac.in to register.",
        })
        return
      }

      // Get ID token for backend
      const idToken = await user.getIdToken(true)
      const res = await fetch("/api/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.message || "Google login failed")
      }

      // Redirect to profile
      router.push("/profile")
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "Something went wrong. Please try again.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to Milan</CardTitle>
        <CardDescription>
          Sign in with Google to continue. Only emails ending with <strong>@iith.ac.in</strong> are allowed.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button
          variant="outline"
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Please wait..." : "Continue with Google"}
        </Button>
      </CardContent>
    </Card>
  )
}
