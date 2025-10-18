"use client"

import { useEffect, useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Category = "sports-boys" | "sports-girls" | "culti" | "techy"
type Entry = { team: string; points: number }

const TEAMS = ["Crimson Coyotes", "Azure Aces", "Golden Griffins", "Emerald Eagles"] as const

const FILTERS: { key: Category; label: string }[] = [
  { key: "sports-boys", label: "Sports Boys" },
  { key: "sports-girls", label: "Sports Girls" },
  { key: "culti", label: "Cultural" },
  { key: "techy", label: "Technical" },
]

type LeaderboardResponse = Record<Category, Entry[]>

export function ScoresBoard() {
  const [category, setCategory] = useState<Category>("sports-boys")
  const [scores, setScores] = useState<LeaderboardResponse | null>(null)
  const [loading, setLoading] = useState(true)

  // ---- Fetch scores from backend ---- //
  const fetchScores = async () => {
    try {
      const res = await fetch("/api/leaderboard")
      if (!res.ok) throw new Error("Failed to fetch scores")
      const data: { scores: LeaderboardResponse } = await res.json()
      setScores(data.scores)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // ---- Initial fetch & polling every 10s ---- //
  useEffect(() => {
    fetchScores() // initial fetch
    const interval = setInterval(fetchScores, 10000) // poll every 10 seconds
    return () => clearInterval(interval)
  }, [])

  const rows = useMemo(() => {
    if (!scores) return []
    const sorted = [...(scores[category] || [])].sort((a, b) => b.points - a.points)
    return sorted
  }, [scores, category])

  const totalTeams = TEAMS.length

  if (loading) {
    return <div>Loading scores...</div>
  }

  return (
    <Card className="overflow-hidden">
      {/* Header + Filters */}
      <div className="flex items-center justify-between gap-4 border-b px-4 py-3">
        <div className="flex flex-col">
          <h2 className="text-base font-semibold">Scores</h2>
          <p className="text-xs text-muted-foreground">
            Showing {categoryLabel(category)} scores for {totalTeams} teams
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Score filters">
          {FILTERS.map((f) => {
            const active = category === f.key
            return (
              <Button
                key={f.key}
                size="sm"
                variant={active ? "default" : "outline"}
                aria-pressed={active}
                onClick={() => setCategory(f.key)}
              >
                {f.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-3 bg-muted px-4 py-2 text-sm font-medium">
        <div>Rank</div>
        <div>Team</div>
        <div className="text-right">Points</div>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li key={`${category}-${r.team}`} className="grid grid-cols-3 items-center px-4 py-3 odd:bg-muted/30">
            <div className="text-sm">{i + 1}</div>
            <div className="text-sm font-medium">{r.team}</div>
            <div className="text-right text-sm">{r.points}</div>
          </li>
        ))}
      </ul>

      <div className="px-4 py-3 text-xs text-muted-foreground">
        Scores are dynamically fetched from the backend and auto-refresh every 10 seconds.
      </div>
    </Card>
  )
}

function categoryLabel(c: Category) {
  switch (c) {
    case "sports-boys":
      return "Sports (Boys)"
    case "sports-girls":
      return "Sports (Girls)"
    case "culti":
      return "Cultural"
    case "techy":
      return "Technical"
  }
}
