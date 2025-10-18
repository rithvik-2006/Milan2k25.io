"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

type Scores = {
  id: string
  name: string
  category: "Sports-Boys" | "Sports-Girls"
  scores: Record<string, number>
}

const ALL_HOSTELS = [
  "RAMANUJA",
  "KALAM",
  "SUSRUTA+VYASA",
  "VISWESWARAYA",
  "CHARAKA+KAUTILYA",
  "VIVEKANANDA",
  "SN BOSE",
  "BHABHA",
  "SARABHAI",
  "BG+VARAHAMIHIRA",
  "RAMANUJAN",
  "RAMAN",
  "GARGI",
  "KALPANA CHAWLA",
  "ANANDI",
  "MAITREYI",
  "ARYABHATTA",
  "SAROJINI NAIDU",
]

async function fetchScores(): Promise<Scores[]> {
  const sheetUrl =
    "https://docs.google.com/spreadsheets/d/1OVaR4FbQOvD3XqAJt9FLvhIxiM0I8zjy6uPqGJni8yw/export?format=csv"

  const response = await fetch(sheetUrl)
  const text = await response.text()
  const rows = text.split("\n").map((r) => r.split(","))
  const headers = rows[0]
  const data = rows.slice(1)

  return data
    .filter((row) => row[0])
    .map((row) => {
      const scores: Record<string, number> = {}
      for (let i = 3; i < row.length; i++) {
        if (headers[i] && row[i]) scores[headers[i]] = Number(row[i])
      }
      return {
        id: row[0],
        name: row[1],
        category: row[2] as Scores["category"],
        scores,
      }
    })
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<
    { name: string; totalScore: number }[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const sheetData = await fetchScores()

        const totals = ALL_HOSTELS.map((hostel) => {
          let total = 0
          sheetData.forEach((entry) => {
            Object.entries(entry.scores).forEach(([hostelName, score]) => {
              if (hostelName === hostel) total += score
            })
          })
          return { name: hostel, totalScore: total }
        })

        totals.sort((a, b) => b.totalScore - a.totalScore)
        setLeaderboard(totals)
      } catch (err: any) {
        toast({
          title: "Failed to load leaderboard",
          description: err.message,
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="mx-auto max-w-4xl w-full py-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-foreground">
        🏆 Hostel Leaderboard
      </h1>

      {loading ? (
        <div className="p-6 text-center text-muted-foreground">
          Loading leaderboard...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="py-3 px-4 text-left text-foreground">Rank</th>
                <th className="py-3 px-4 text-left text-foreground">Hostel</th>
                <th className="py-3 px-4 text-left text-foreground">Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((item, index) => (
                <tr
                  key={item.name}
                  className={`border-t border-gray-200 dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-foreground">
                    {index + 1}
                  </td>
                  <td className="py-3 px-4 text-foreground">{item.name}</td>
                  <td className="py-3 px-4 font-bold text-foreground">
                    {item.totalScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
