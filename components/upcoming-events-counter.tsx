"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Event } from "@/lib/data"

type FilterKey = "sports_boys" | "sports_girls" | "culti" | "techy"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "sports_boys", label: "Sports Boys" },
  { key: "sports_girls", label: "Sports Girls" },
  { key: "culti", label: "Culti" },
  { key: "techy", label: "Techy" },
]

function isUpcoming(dateISO: string) {
  return new Date(dateISO) > new Date()
}

function matchesFilter(e: Event, f: FilterKey) {
  // NOTE: Data does not currently include a gender field.
  // Both Sports Boys and Sports Girls map to the "Sports" category for now.
  // To support gender later: extend Event with `gender?: "Boys" | "Girls"` and check it here.
  if (f === "sports_boys") return e.category === "Sports-Boys"
  if (f === "sports_girls") return e.category === "Sports-Girls"
  if (f === "culti") return e.category === "Cultural"
  if (f === "techy") return e.category === "Technical"
  return true
}

export function UpcomingEventsCounter({ events }: { events: Event[] }) {
  const [filter, setFilter] = useState<FilterKey>("sports_boys")

  const count = useMemo(() => {
    return events.filter((e) => isUpcoming(e.date) && matchesFilter(e, filter)).length
  }, [events, filter])

  return (
    <section aria-labelledby="upcoming-heading" className="mx-auto max-w-6xl px-6 py-10 md:py-14">
      <h2 id="upcoming-heading" className="sr-only">
        Upcoming Events Count
      </h2>

      <Card className="p-6 md:p-8">
        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Upcoming events filter">
            {FILTERS.map((f) => {
              const active = filter === f.key
              return (
                <Button
                  key={f.key}
                  variant={active ? "default" : "outline"}
                  size="sm"
                  aria-pressed={active}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Count */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Number of upcoming events</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight">{count}</p>
          </div>
          <div className="text-sm text-muted-foreground">
            See full details on the{" "}
            <a href="/events" className="text-sky-600 underline hover:text-sky-700">
              Events page
            </a>
            .
          </div>
        </div>
      </Card>
    </section>
  )
}
