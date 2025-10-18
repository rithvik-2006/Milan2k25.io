"use client"

import { sponsors } from "@/lib/data"

export function SponsorsCarousel() {
  return (
    <div className="relative overflow-hidden rounded">
      {/* <div
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      /> */}
      <div className="flex animate-scroll gap-8 px-6 py-6 hover:pause-animation">
        {[...sponsors, ...sponsors].map((s, idx) => (
          <div key={s.id + idx} className="flex min-w-[200px] items-center justify-center rounded-lg bg-white p-6">
            <img
              src={s.logo || "/placeholder.svg?height=40&width=140&query=sponsor%20logo"}
              alt={`${s.name} logo`}
              className="max-h-16 " 
            />
          </div>
        ))}
      </div>
      <style jsx>{`
      
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
          .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}