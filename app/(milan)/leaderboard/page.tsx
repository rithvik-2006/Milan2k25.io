"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScoresBoard } from "@/components/scores-board"
import { Leaderboard } from "@/components/leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-3xl py-10 md:py-14">
      <h1 className="mb-6 text-2xl font-bold">Live Score / Leaderboard</h1>

      <Tabs defaultValue="scores" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="scores">Scores</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="scores" className="mt-0">
          <ScoresBoard />
        </TabsContent>

        <TabsContent value="leaderboard" className="mt-0">
          <Leaderboard />
          <p className="mt-4 text-sm text-muted-foreground">
            Scores update in real-time from admin updates.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
