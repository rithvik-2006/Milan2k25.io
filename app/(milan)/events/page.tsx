

"use client"

import React, { useState, useEffect, useRef } from "react"
import { Event } from "@/lib/data"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type Tab = "results" | "leaderboard" | "events"
const categories = ["Sports-Boys", "Sports-Girls", "Cultural", "Technical"] as const

// ✅ Fixed: Check if date is today (supports DD/MM/YYYY)
function isToday(dateString?: string) {
  if (!dateString) return false

  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
  const year = today.getFullYear()

  let d: number, m: number, y: number

  if (dateString.includes("/")) {
    const parts = dateString.split("/")
    d = parseInt(parts[0])
    m = parseInt(parts[1])
    y = parseInt(parts[2])
  } else {
    const dateObj = new Date(dateString)
    if (isNaN(dateObj.getTime())) return false
    d = dateObj.getDate()
    m = dateObj.getMonth() + 1
    y = dateObj.getFullYear()
  }

  return d === day && m === month && y === year
}

// Boys and Girls hostels
const BOYS_HOSTELS = [
  "RAMANUJA", "KALAM", "SUSRUTA+VYASA", "VISWESWARAYA",
  "CHARAKA+KAUTILYA", "VIVEKANANDA", "SN BOSE", "BHABHA",
  "SARABHAI", "BG+VARAHAMIHIRA", "RAMANUJAN", "RAMAN"
]
const GIRLS_HOSTELS = [
  "GARGI", "KALPANA CHAWLA", "ANANDI",
  "MAITREYI", "ARYABHATTA", "SAROJINI NAIDU"
]

// Boys and Girls sports
const BOYS_SPORTS = [
  "8 Ball Pool", "Badminton", "Basketball", "Carroms",
  "Chess", "Squash", "Table Tennis", "Volleyball", "Tennis",
  "Athletics", "Aquatics", "Powerlifting", "Weightlifting"
]
const GIRLS_SPORTS = [
  "Badminton", "Basketball", "Carroms", "Chess",
  "Squash", "Table Tennis", "Volleyball", "Tennis",
  "Athletics", "Aquatics", "Dodgeball (Women)",
  "Powerlifting", "Weightlifting"
]

export default function EventsPage() {
  const [active, setActive] = useState<Tab>("results")
  const [events, setEvents] = useState<Event[]>([])
  const [scores, setScores] = useState<Record<string, Record<string, number>>>({})
  const [loading, setLoading] = useState(true)
  const [tableView, setTableView] = useState<"boys" | "girls">("boys")

  const resultsRef = useRef<HTMLDivElement>(null)
  const leaderboardRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)

  // ✅ Fetch events (for events section)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events")
        const data: Event[] = await res.json()
        setEvents(data)
        console.log(data)
      } catch (err: any) {
        toast({ title: "Failed to fetch events", description: err.message })
      }
    }
    fetchEvents()
  }, [])

  // ✅ Fetch leaderboard/scores from Google Sheet
  const fetchScores = async () => {
    setLoading(true);
    try {
      // 👇 Mapping of sheet names to their GIDs
      const sheetTabs = {
        Badminton: "123456789", // Replace with actual gid of Badminton sheet
        Carrom: "987654321", // Replace with actual gid of Carrom sheet
        // Add more here if needed
      };

      const parsedScores: Record<string, Record<string, number>> = {};

      // 👇 Fetch all sheets in parallel
      const promises = Object.entries(sheetTabs).map(async ([sheetName, gid]) => {
        const url = `https://docs.google.com/spreadsheets/d/1q9BUXbvpXbW9JxAkJibK-H5e65LGptPcwGS3DDpS2e8/export?format=csv&gid=${gid}`;
        const res = await fetch(url);
        const text = await res.text();

        const rows = text.split("\n").map((r) => r.split(","));
        const headers = rows[0];
        const data = rows.slice(1);

        data.forEach((row) => {
          if (!row[0]) return;
          const eventName = row[1]?.trim() || sheetName;
          parsedScores[eventName] = {};

          for (let i = 3; i < row.length; i++) {
            if (headers[i] && row[i]) {
              parsedScores[eventName][headers[i].trim()] = Number(row[i]);
            }
          }
        });
      });

      await Promise.all(promises);

      setScores(parsedScores);
    } catch (err: any) {
      toast({
        title: "Failed to fetch results",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores()
  }, [])

  // ✅ Intersection observer for nav highlight
  useEffect(() => {
    const sections = [
      { id: "results", ref: resultsRef },
      { id: "leaderboard", ref: leaderboardRef },
      { id: "events", ref: eventsRef },
    ]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActive(visible.target.id as Tab)
      },
      { threshold: 0.4 }
    )
    sections.forEach(({ ref }) => ref.current && observer.observe(ref.current))
    return () => observer.disconnect()
  }, [])

  // ✅ Scroll handler
  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const navbar = document.querySelector(".navbar") as HTMLElement
      const yOffset = -(navbar?.offsetHeight ?? 64)
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  // ✅ Filter today's events
  const todayEvents = events.filter((e) => isToday(e.date))

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat overflow-x-hidden">
      {/* Sticky Nav */}
      <div className="sticky top-16 w-full z-30 border-b bg-background/95 backdrop-blur navbar">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {["results", "leaderboard", "events"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  scrollToSection(tab === "results" ? resultsRef : tab === "leaderboard" ? leaderboardRef : eventsRef)
                }
                className={`text-sm sm:text-base font-medium cursor-pointer transition-colors pb-1 ${
                  active === tab 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "results"
                  ? "Results"
                  : tab === "leaderboard"
                    ? "Leaderboard"
                    : "Events"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        {/* ✅ Results */}
        <section id="results" ref={resultsRef} className="mb-16 scroll-mt-32">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Results</h1>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">Loading Results...</p>
          ) : Object.keys(scores).length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No Matches available.</p>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(scores).map(([eventName, hostelScores]) => (
                <Card key={eventName} className="p-4 hover:shadow-lg transition-shadow">
                  <h3 className="text-base sm:text-lg font-semibold mb-3">{eventName}</h3>
                  <ul className="space-y-2">
                    {Object.entries(hostelScores)
                      .sort(([, a], [, b]) => b - a)
                      .map(([hostel, score]) => (
                        <li key={hostel} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">{hostel}</span>
                          <span className="font-medium">{score}</span>
                        </li>
                      ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* ✅ Leaderboard */}
        <section id="leaderboard" ref={leaderboardRef} className="mb-16 scroll-mt-32">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Leaderboard</h1>

          {/* Toggle */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={tableView === "boys" ? "default" : "outline"} 
              onClick={() => setTableView("boys")}
              className="min-w-[100px]"
            >
              Boys
            </Button>
            <Button 
              variant={tableView === "girls" ? "default" : "outline"} 
              onClick={() => setTableView("girls")}
              className="min-w-[100px]"
            >
              Girls
            </Button>
          </div>

          <div className="w-full overflow-x-auto rounded-lg border shadow-sm">
            <table className="w-full border-collapse text-xs sm:text-sm bg-black text-white">
              <thead>
                <tr className="bg-gray-900">
                  <th className="sticky left-0 z-10 bg-gray-900 px-3 sm:px-4 py-3 text-left border border-gray-700 min-w-[120px]">
                    Event
                  </th>
                  {(tableView === "boys" ? BOYS_HOSTELS : GIRLS_HOSTELS).map((h) => (
                    <th key={h} className="px-3 sm:px-4 py-3 text-left border border-gray-700 whitespace-nowrap min-w-[100px]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(tableView === "boys" ? BOYS_SPORTS : GIRLS_SPORTS).map((sport, idx) => (
                  <tr 
                    key={sport} 
                    className={`border-t border-gray-700 ${idx % 2 === 0 ? 'bg-gray-950' : 'bg-black'}`}
                  >
                    <td className="sticky left-0 z-10 px-3 sm:px-4 py-2 border border-gray-700 font-medium bg-inherit">
                      {sport}
                    </td>
                    {(tableView === "boys" ? BOYS_HOSTELS : GIRLS_HOSTELS).map((h) => (
                      <td key={h} className="px-3 sm:px-4 py-2 border border-gray-700 text-center">
                        {scores[sport]?.[h] ?? "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ✅ Today's Events */}
        <section id="events" ref={eventsRef} className="mb-16 scroll-mt-32">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Today's Events</h1>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div className="col-span-full text-center text-muted-foreground py-8">
                Loading events...
              </div>
            ) : todayEvents.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-8">
                No events today.
              </div>
            ) : (
              todayEvents.map((e) => <EventCard key={e.id} event={e} />)
            )}
          </div>
        </section>
      </div>
    </div>
  )
}