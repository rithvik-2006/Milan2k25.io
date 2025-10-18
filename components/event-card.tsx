"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Clock } from "lucide-react"
import { Countdown } from "./countdown"
import type { Event } from "@/lib/data"
import { motion } from "framer-motion"
import { format, isValid } from "date-fns"

export function EventCard({ event }: { event: Event }) {
  const [formattedDate, setFormattedDate] = useState<string>("")
  const [formattedTime, setFormattedTime] = useState<string>("")

  useEffect(() => {
    try {
      // Ensure date exists
      if (!event.date) return

      // Construct ISO string safely
      const dateStr = event.startTime
        ? `${event.date}T${event.startTime}`
        : event.date

      const dateObj = new Date(dateStr)

      if (!isValid(dateObj)) return

      setFormattedDate(format(dateObj, "MMM d, yyyy"))
      setFormattedTime(format(dateObj, "p"))
    } catch (err) {
      console.error("Invalid date:", event.date, event.startTime, err)
    }
  }, [event.date, event.startTime])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="text-pretty">{event.name}</CardTitle>
          <div className="text-xs text-muted-foreground">{event.category}</div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">{event.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="size-4" />
              {formattedDate || "TBD"}
            </span>
            {formattedTime && (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-4" />
                {formattedTime}
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-4" /> {event.location}
            </span>
            <Countdown targetISO={event.date} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}