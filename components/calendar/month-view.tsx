"use client"

import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"

export type Event = {
  id: string
  title: string
  date: string // ISO string
  preferred?: boolean
}

export function MonthView({
  events,
  selectedDate,
  onSelectDate,
}: {
  events: Event[]
  selectedDate?: Date
  onSelectDate?: (date: Date) => void
}) {
  const [cursor, setCursor] = useState(new Date())
  const [direction, setDirection] = useState<"left" | "right">("right")

  // Group events by day
  const eventsByDay = useMemo(() => {
    const map = new Map<string, Event[]>()
    events.forEach((event) => {
      const date = event.date ? parseISO(event.date) : new Date()
      const key = format(date, "yyyy-MM-dd")
      if (!map.has(key)) {
        map.set(key, [])
      }
      map.get(key)!.push(event)
    })
    return map
  }, [events])

  // Days to render in month grid
  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor))
    const end = endOfWeek(endOfMonth(cursor))
    return eachDayOfInterval({ start, end })
  }, [cursor])

  return (
    <div className="flex flex-col gap-2">
      {/* Header with navigation */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {format(cursor, "MMMM yyyy")}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setDirection("left")
              setCursor(addMonths(cursor, -1))
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setDirection("right")
              setCursor(addMonths(cursor, 1))
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              const today = new Date()
              if (!isSameMonth(cursor, today)) {
                setDirection(today > cursor ? "right" : "left")
                setCursor(today) // only slide if different month
              }
              onSelectDate?.(today)
            }}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Weekdays header */}
      <div className="grid grid-cols-7 text-center font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days grid with smooth animation */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={cursor.getTime()}
            initial={{ x: direction === "right" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction === "right" ? -50 : 50, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-7"
          >
            {days.map((date) => {
              const key = format(date, "yyyy-MM-dd")
              const eventsForDay = eventsByDay.get(key) ?? []
              const preferred = eventsForDay.filter((e) => e.preferred)
              const others = eventsForDay.filter((e) => !e.preferred)

              const isToday = isSameDay(date, new Date())
              const isSelected =
                selectedDate && isSameDay(date, selectedDate)

              return (
                <button
                  key={key}
                  onClick={() => {
                    onSelectDate?.(date)
                    if (!isSameMonth(date, cursor)) {
                      setDirection(date > cursor ? "right" : "left")
                      setCursor(date) // slide to that month
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center justify-start rounded-2xl p-1 h-20 transition-colors cursor-pointer",
                    isSameMonth(date, cursor)
                      ? "bg-background"
                      : "opacity-40",
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "hover:bg-muted",
                    isToday && !isSelected
                      ? "ring-2 ring-blue-500 ring-inset"
                      : ""
                  )}
                >
                  <time
                    dateTime={format(date, "yyyy-MM-dd")}
                    className="font-semibold"
                  >
                    {format(date, "d")}
                  </time>

                  {/* Single Event Indicator */}
                  <div className="flex justify-center mt-1">
                    {preferred.length > 0 ? (
                      <div
                        className="h-1.5 w-1.5 rounded-full bg-primary"
                        title={preferred[0].title}
                      />
                    ) : others.length > 0 ? (
                      <div
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        title={others[0].title}
                      />
                    ) : null}
                  </div>
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}