"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { auth } from "@/lib/firebase"

// ---- Boys and Girls hostels ---- //
const BOYS_HOSTELS = [
  "RAMANUJA", "KALAM", "SUSRUTA+VYASA", "VISWESWARAYA", "CHARAKA+KAUTILYA",
  "VIVEKANANDA", "SN BOSE", "BHABHA", "SARABHAI", "BG+VARAHAMIHIRA",
  "RAMANUJAN", "RAMAN"
]

const GIRLS_HOSTELS = [
  "GARGI", "KALPANA CHAWLA", "ANANDI", "MAITREYI", "ARYABHATTA", "SAROJINI NAIDU"
]

// ---- Boys and Girls sports ---- //
const BOYS_SPORTS = [
  "8 Ball Pool", "Badminton", "Basketball", "Carroms", "Chess", "Squash",
  "Table Tennis", "Volleyball", "Tennis", "Athletics", "Aquatics",
  "Powerlifting", "Weightlifting"
]

const GIRLS_SPORTS = [
  "Badminton", "Basketball", "Carroms", "Chess", "Squash",
  "Table Tennis", "Volleyball", "Tennis", "Athletics", "Aquatics",
  "Dodgeball (Women)", "Powerlifting", "Weightlifting"
]

type Score = {
  [sport: string]: {
    [hostel: string]: number
  }
}

export default function AdminPage() {
  const router = useRouter()
  const [scores, setScores] = useState<Score>({})
  const [loading, setLoading] = useState(false)
  const [authChecking, setAuthChecking] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  const ADMIN_EMAILS = ["admin@milanvit.in", "milan.admin@vitap.ac.in"]

  // ---- Admin check ---- //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setUserEmail(user.email);
        setAuthChecking(false);
      }
    });
    return () => unsubscribe();
  }, [router]);
  

  // ---- Fetch initial scores ---- //
  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true)
        const user = auth.currentUser
        if (!user) throw new Error("User not logged in")
        const token = await user.getIdToken()

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/api/leaderboard`, {
          headers: { Authorization: `Bearer ${token}` }
        })

        if (!res.ok) throw new Error("Failed to fetch leaderboard")
        const data = await res.json()

        const initScores: Score = {}

        BOYS_SPORTS.forEach(sport => {
          initScores[sport] = {}
          BOYS_HOSTELS.forEach(hostel => {
            initScores[sport][hostel] = data.scores?.[sport]?.[hostel] ?? 0
          })
        })

        GIRLS_SPORTS.forEach(sport => {
          initScores[sport] = {}
          GIRLS_HOSTELS.forEach(hostel => {
            initScores[sport][hostel] = data.scores?.[sport]?.[hostel] ?? 0
          })
        })

        setScores(initScores)
      } catch (err: any) {
        toast({ title: "❌ Error", description: err.message })
      } finally {
        setLoading(false)
      }
    }

    fetchScores()
  }, [])

  // ---- Handle input change ---- //
  const handleScoreChange = (sport: string, hostel: string, value: string) => {
    const num = Number(value)
    if (isNaN(num)) return
    setScores(prev => ({
      ...prev,
      [sport]: { ...prev[sport], [hostel]: num }
    }))
  }

  // ---- Save to backend ---- //
  const handleSave = async () => {
    try {
      setLoading(true)
      const user = auth.currentUser
      if (!user) throw new Error("User not logged in")
      const token = await user.getIdToken()

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || ""}/api/leaderboard/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ scores, updatedBy: userEmail })
      })

      if (!res.ok) throw new Error("Failed to update leaderboard")

      toast({
        title: "✅ Scores Updated",
        description: "Leaderboard successfully refreshed."
      })

      // Trigger an event so public leaderboard can refresh
      window.dispatchEvent(new Event("leaderboardUpdated"))
    } catch (err: any) {
      toast({ title: "❌ Error", description: err.message })
    } finally {
      setLoading(false)
    }
  }

  if (authChecking) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Checking admin access...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <Card className="max-w-7xl mx-auto shadow-md">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-2xl font-bold">
            🏆 Admin Portal — Hostel Scores
          </CardTitle>
          <Button onClick={handleSave} disabled={loading} className="mt-4 md:mt-0">
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Save Updates
          </Button>
        </CardHeader>

        <CardContent className="overflow-x-auto space-y-12">
          {/* Boys Table */}
          <div>
            <h2 className="text-xl font-bold mb-2">🏋️ Boys Scores</h2>
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border text-left">Sport</th>
                  {BOYS_HOSTELS.map(h => (
                    <th key={h} className="p-3 border text-sm font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BOYS_SPORTS.map(sport => (
                  <tr key={sport} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">{sport}</td>
                    {BOYS_HOSTELS.map(hostel => (
                      <td key={hostel} className="p-2 border">
                        <Input
                          type="number"
                          value={scores[sport]?.[hostel] ?? 0}
                          onChange={(e) => handleScoreChange(sport, hostel, e.target.value)}
                          className="w-20 text-center"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Girls Table */}
          <div>
            <h2 className="text-xl font-bold mb-2">🏋️ Girls Scores</h2>
            <table className="min-w-full border border-gray-300 rounded-md">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 border text-left">Sport</th>
                  {GIRLS_HOSTELS.map(h => (
                    <th key={h} className="p-3 border text-sm font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GIRLS_SPORTS.map(sport => (
                  <tr key={sport} className="hover:bg-gray-50">
                    <td className="p-3 border font-medium">{sport}</td>
                    {GIRLS_HOSTELS.map(hostel => (
                      <td key={hostel} className="p-2 border">
                        <Input
                          type="number"
                          value={scores[sport]?.[hostel] ?? 0}
                          onChange={(e) => handleScoreChange(sport, hostel, e.target.value)}
                          className="w-20 text-center"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
