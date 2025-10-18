"use client"

import { useState } from "react"
import { gallery } from "@/lib/data"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export function GalleryGrid() {
  const [active, setActive] = useState<string | null>(null)
  const item = gallery.find((g) => g.id === active)

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {gallery.map((g) => (
          <button
            key={g.id}
            onClick={() => setActive(g.id)}
            className="group overflow-hidden rounded-lg border focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <img
              src={g.src || "/placeholder.svg?height=480&width=800&query=festival"}
              alt={g.alt}
              className="aspect-video w-full object-cover transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={() => setActive(null)}>
        <DialogContent className="max-w-4xl p-0">
          {item && (
            <img
              src={item.src || "/placeholder.svg?height=480&width=800&query=festival"}
              alt={item.alt}
              className="h-full w-full rounded-lg object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
