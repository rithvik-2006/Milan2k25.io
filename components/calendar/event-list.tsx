"use client"

import { format, isAfter, parseISO, startOfDay } from "date-fns"
import type { Event } from "@/lib/data"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

function toDate(e: Event) {
  return e.date ? parseISO(e.date) : new Date()
}

export type EventListProps = {
  events: Event[]
  preferredEventIds: string[]
  onlyPreferred?: boolean
  onTogglePreferred?: (id: string) => void
}

export function EventList({ events, preferredEventIds, onlyPreferred = false, onTogglePreferred }: EventListProps) {
  const now = startOfDay(new Date())
  const upcoming = useMemo(
    () => events.filter((e) => isAfter(toDate(e), now)).sort((a, b) => +toDate(a) - +toDate(b)),
    [events, now],
  )

  const grouped = useMemo(() => {
    const g = new Map<string, Event[]>()
    const src = upcoming
    for (const e of src) {
      const key = format(toDate(e), "yyyy-MM-dd")
      if (!g.has(key)) g.set(key, [])
      g.get(key)!.push(e)
    }
    // sort each group by time
    for (const [k, arr] of g.entries()) {
      arr.sort((a, b) => +toDate(a) - +toDate(b))
      g.set(k, arr)
    }
    return Array.from(g.entries()).sort(([a], [b]) => (a < b ? -1 : 1))
  }, [upcoming])

  return (
    <div className="space-y-6">
      {grouped.map(([key, items]) => {
        const pref = items.filter((e) => preferredEventIds.includes(e.id))
        const oth = items.filter((e) => !preferredEventIds.includes(e.id))
        const showPref = pref.length > 0
        const showOther = !onlyPreferred && oth.length > 0
        return (
          <div key={key} className="space-y-4">
            <div className="text-xs text-muted-foreground">{format(parseISO(key), "EEEE, MMM d")}</div>
            {showPref && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Preferred</h4>
                <ul className="space-y-2">
                  {pref.map((e) => (
                    <li key={e.id} className="rounded-md border p-3 border-primary">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-medium text-pretty">{e.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {format(toDate(e), "EEE, MMM d · p")} · {e.location}
                          </div>
                        </div>
                        {onTogglePreferred ? (
                          <button
                            onClick={() => onTogglePreferred(e.id)}
                            className="rounded px-2 py-1 text-xs border bg-primary text-primary-foreground"
                            aria-label="Remove from preferred"
                          >
                            Preferred
                          </button>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showOther && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Other</h4>
                <ul className="space-y-2">
                  {oth.map((e) => {
                    const isPref = preferredEventIds.includes(e.id)
                    return (
                      <li key={e.id} className={cn("rounded-md border p-3", isPref ? "border-primary" : "")}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-medium text-pretty">{e.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {format(toDate(e), "EEE, MMM d · p")} · {e.location}
                            </div>
                          </div>
                          {onTogglePreferred ? (
                            <button
                              onClick={() => onTogglePreferred(e.id)}
                              className={cn("rounded px-2 py-1 text-xs border hover:bg-muted")}
                              aria-label="Add to preferred"
                            >
                              Add
                            </button>
                          ) : null}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
