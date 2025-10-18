"use client"

import { useEffect, useRef, useState } from "react"
import { testimonials } from "@/lib/data"
import { Quote } from "lucide-react"

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timer.current = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 4000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [])

  const t = testimonials[index]

  return (
    <div className="rounded-lg border p-6">
      <div className="mb-3 flex items-center gap-2 text-sky-500">
        <Quote className="size-5" />
        <span className="text-sm font-medium">What people say</span>
      </div>
      <figure>
        <blockquote className="text-pretty text-lg leading-relaxed">
          {"“"}
          {t.quote}
          {"”"}
        </blockquote>
        <figcaption className="mt-3 text-sm text-muted-foreground">— {t.name}</figcaption>
      </figure>
    </div>
  )
}
