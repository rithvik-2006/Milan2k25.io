"use client"

import { useEffect, useState } from "react"

export function Countdown({ targetISO }: { targetISO: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetISO))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(targetISO)), 1000)
    return () => clearInterval(id)
  }, [targetISO])

  if (timeLeft.total <= 0) {
    return <span className="text-xs font-medium text-amber-400">Live now</span>
  }

  return (
    <div className="text-xs text-muted-foreground">
      {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
    </div>
  )
}

function getTimeLeft(targetISO: string) {
  const diff = new Date(targetISO).getTime() - Date.now()
  const total = Math.max(0, diff)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((total / (1000 * 60)) % 60)
  const seconds = Math.floor((total / 1000) % 60)
  return { total, days, hours, minutes, seconds }
}
