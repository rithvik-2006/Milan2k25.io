// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { AuthForm } from "@/components/auth-form"
// import { auth } from "@/lib/firebase"

// export default function SignupPage() {
//   const router = useRouter()
//   const [initialized, setInitialized] = useState(false)

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setInitialized(true)
//       if (user) {
//         // Only redirect if user is actually logged in
//         router.push("/profile")
//       }
//     })
//     return () => unsubscribe()
//   }, [router])

//   if (!initialized) return <p className="text-center mt-10">Loading...</p>

//   return (
//     <div className="mx-auto max-w-5xl py-10 md:py-14">
//       <h1 className="mb-6 text-2xl font-bold">Create your account</h1>
//       <AuthForm type="signup" />
//       <p className="mt-4 text-center text-sm text-muted-foreground">
//         Already have an account?{" "}
//         <Link href="/login" className="text-sky-500 hover:underline">
//           Log in
//         </Link>
//       </p>
//     </div>
//   )
// }
