"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  const router = useRouter()
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setInitialized(true)
      if (user) router.push("/profile")
    })
    return () => unsubscribe()
  }, [router])

  if (!initialized) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="mx-auto max-w-5xl py-10 md:py-14">
      <h1 className="mb-6 text-2xl font-bold text-center">Login with Google</h1>
      <AuthForm />
    </div>
  )
}
