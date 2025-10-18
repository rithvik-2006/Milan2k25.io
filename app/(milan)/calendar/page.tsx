"use client"

import EventsCalendar from "@/components/events-calendar"

export default function CalendarPage() {
  return (
    <div className="mx-auto max-w-6xl py-10 md:py-14 text-center">
      <h1 className="mb-2 text-2xl font-bold text-balance">Calendar</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Track your preferred events and get reminders. Use the filters to focus on what matters to you.
      </p>
      <EventsCalendar />
    </div>
  )
}
// frontend/app/(milan)/calendar/page.tsx