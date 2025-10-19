

"use client"

import { useEffect, useState } from "react"
// @ts-ignore
import confetti from "canvas-confetti"
import Link from "next/link"
import { EventCard } from "@/components/event-card"
import { events } from "@/lib/data"
import { SponsorsCarousel } from "@/components/sponsors-carousel"
import { Leaderboard } from "@/components/leaderboard"
// import { ChatbotFAB } from "@/components/chatbot-fab"
import { UpcomingEventsCounter } from "@/components/upcoming-events-counter"
import { Button } from "@/components/ui/button"

import { Gravitas_One } from "next/font/google"

const gravitas = Gravitas_One({
  weight: "400",
  subsets: ["latin"],
})

export default function Page() {
  const [activeTab, setActiveTab] = useState("leaderboard")

  

  return (
    <div className="overflow-x-hidden">
      <div className="min-h-screen bg-cover bg-center bg-no-repeat">
        {/* About Milan with background image */}
        <section
          aria-labelledby="about-heading"
          className="relative isolate flex items-center justify-center w-full min-h-screen"
        >
          <img
            src="/WhatsApp Image 2025-10-17 at 15.07.43.jpeg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative z-10 text-center px-4 sm:px-6">
            <h1 
              className={`${gravitas.className} text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] leading-tight font-normal`}
            >
              MILAN
            </h1>

            <p className="mt-6 sm:mt-8 max-w-4xl mx-auto text-base sm:text-lg lg:text-2xl text-white/90 leading-relaxed">
              MILAN stands as one of the largest and most eagerly awaited inter-hostel competitions in India. It is a thrilling showcase of talent and spirit, uniting students in a vibrant and dynamic celebration.
            </p>
            <p className="mt-4 sm:mt-8 max-w-4xl mx-auto text-base sm:text-lg lg:text-2xl text-white/90 leading-relaxed">
              With each passing year, participation in this General Championship has been on the rise, contributing to an atmosphere of heightened enthusiasm and camaraderie. Drawing over 6,000+ attendees.
            </p>
          </div>
        </section>

        {/* Aftermovie embedded video */}
        <section className="w-full px-4 sm:px-6 py-10 md:py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Aftermovie</h2>
          <div className="mx-auto aspect-video w-full max-w-6xl overflow-hidden rounded-lg border">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/xQ1YUtNGv7Q"
              title="Milan Aftermovie"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>

        {/* Theme */}
        <section className="w-full px-4 sm:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Theme</h2>
            <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
              <div className="h-full min-h-[250px]">
                <img
                  src="/WhatsApp Image 2025-10-17 at 02.42.39.jpeg"
                  alt="Vibrant lights and stage representing this year's theme"
                  className="w-full h-full rounded-lg border object-cover"
                />
              </div>
              <div className="h-full min-h-[250px] rounded-2xl border bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white p-6 shadow-lg flex items-center">
                <p className="text-sm sm:text-base text-pretty">
                  This year's theme celebrates audacity and unity—bringing together performers, athletes, and innovators to push boundaries and create unforgettable moments. Expect bolder stages, tighter competitions, and a community-driven spirit throughout the festival.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mascot */}
        <section className="w-full px-4 sm:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center">Mascot</h2>
            <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
              <div className="order-2 md:order-1 h-full min-h-[250px] rounded-2xl border bg-gradient-to-r from-purple-600/80 to-pink-500/80 text-white p-6 shadow-lg flex items-center">
                <p className="text-sm sm:text-base text-pretty">
                  Pablo is a curious, energetic red panda embodying Carpe Diem—"Seize the Day." His holographic hand symbolizes the act of seizing opportunity in the digital age. Dressed in futuristic gear with Indian motifs and jutti-inspired shoes, Pablo blends heritage and innovation—bold, indigenous, and always ready to grasp the moment.✨
                </p>
              </div>
              <div className="order-1 md:order-2 h-full min-h-[250px]">
                <img
                  src="/WhatsApp Image 2025-10-17 at 02.42.38.jpeg"
                  alt="Milan mascot illustration"
                  className="w-full h-full rounded-lg border object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard & Block Race Toggle */}
        <section className="w-full px-4 sm:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => setActiveTab("leaderboard")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === "leaderboard" 
                    ? "bg-gray-200 text-gray-700" 
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => setActiveTab("blockrace")}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  activeTab === "blockrace" 
                    ? "bg-gray-200 text-gray-700" 
                    : "bg-black text-white hover:bg-gray-800"
                }`}
              >
                Block Race
              </button>
            </div>

            {activeTab === "leaderboard" && (
              <div>
                <Leaderboard />
                <a 
                  href="/leaderboard" 
                  className="text-sm text-sky-600 hover:underline block text-right mt-2"
                >
                  View full board
                </a>
              </div>
            )}

            {activeTab === "blockrace" && (
              <div className="w-full">
                <div className="w-full overflow-hidden rounded-lg border">
                  <iframe
                    src="https://flo.uri.sh/visualisation/25360055/embed"
                    title="Block Race"
                    frameBorder="0"
                    scrolling="no"
                    className="w-full h-[400px] sm:h-[500px] md:h-[600px]"
                    sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                    allowFullScreen
                  />
                </div>
                <div className="w-full mt-2 text-right">
                  <a
                    className="text-xs text-gray-500 hover:underline inline-flex items-center"
                    href="https://public.flourish.studio/visualisation/25360055/?utm_source=embed&utm_campaign=visualisation/25360055"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Made with Flourish"
                      src="https://public.flourish.studio/resources/made_with_flourish.svg"
                      className="w-[105px] h-[16px]"
                    />
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Sponsors */}
        <section className="w-full px-4 sm:px-6 py-10 md:py-14">
          <div className="mx-auto max-w-6xl text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-semibold">Our Sponsors</h2>
            <SponsorsCarousel />
          </div>
        </section>

        {/* Chatbot */}
        {/* <ChatbotFAB /> */}
      </div>
    </div>
  )
}