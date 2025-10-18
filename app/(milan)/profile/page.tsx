"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import PreferencesForm from "@/components/preferences-form"

const CATEGORY_OPTIONS = ["Sports-Boys", "Sports-Girls", "Cultural", "Technical"] as const

export default function ProfilePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [preferredCategories, setPreferredCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchProfile = async () => {
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          router.push("/login")
          return
        }

        try {
          await new Promise((res) => setTimeout(res, 100))
          const idToken = await currentUser.getIdToken(true)
          const resProfile = await fetch("/api/auth/profile", {
            headers: { Authorization: `Bearer ${idToken}` },
          })

          if (!resProfile.ok) {
            const data = await resProfile.json().catch(() => null)
            throw new Error(data?.message || "Failed to fetch profile")
          }

          const data = await resProfile.json()
          setUser(data)
          setPreferredCategories(data.preferredCategories || [])
        } catch (err: any) {
          setError(err.message)
        } finally {
          setLoading(false)
        }
      })
      return () => unsubscribe()
    }

    fetchProfile()
  }, [router])

  if (loading) return <p className="text-center mt-10">Loading profile...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  return (
    <div className="mx-auto max-w-3xl py-10 md:py-14 text-center">
      <h1 className="mb-6 text-2xl font-bold">Your Profile & Preferences</h1>

      {user && (
        <div className="mb-6 text-left border rounded-lg p-4">
          <p><strong>Name:</strong> {user.name || "N/A"}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Provider:</strong> {user.provider}</p>
        </div>
      )}

      <PreferencesForm />

      {/* <div className="my-8 text-left">
  <h2 className="mb-5 text-2xl font-semibold text-white-800">
    Select Your Preferred Categories
  </h2>

  <div className="flex flex-wrap gap-3">
    {CATEGORY_OPTIONS.map((cat) => (
      <button
        key={cat}
        onClick={() =>
          setPreferredCategories((prev) =>
            prev.includes(cat)
              ? prev.filter((c) => c !== cat)
              : [...prev, cat]
          )
        }
        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 
          ${
            preferredCategories.includes(cat)
              ? "bg-primary text-black border-primary hover:bg-primary-dark hover:border-primary-dark focus:ring-primary"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 focus:ring-gray-300"
          }`}
      >
        {cat}
      </button>
    ))}
  </div>

  <button
    disabled={false}
    className="mt-8 w-full px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    Save changes
  </button>
</div> */}


      <div className="mt-6 text-sm text-muted-foreground">
        We’ll personalize Milan updates and calendar events based on your choices.
      </div>
    </div>
  )
}
