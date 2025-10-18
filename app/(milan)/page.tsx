"use client"

import { useEffect, useState } from "react"
// @ts-ignore
import confetti from "canvas-confetti"
import Link from "next/link"
import { EventCard } from "@/components/event-card"
import { events } from "@/lib/data"
import { SponsorsCarousel } from "@/components/sponsors-carousel"
import { Leaderboard } from "@/components/leaderboard"
import { ChatbotFAB } from "@/components/chatbot-fab"
import { UpcomingEventsCounter } from "@/components/upcoming-events-counter"
import { Button } from "@/components/ui/button"

import { Gravitas_One } from "next/font/google"

const gravitas = Gravitas_One({
  weight: "400",
  subsets: ["latin"],
})

export default function Page() {
  const [activeTab, setActiveTab] = useState("leaderboard")

  // 🎉 Confetti effect on page load
  useEffect(() => {
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 1000, scalar: 1.5 }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      for (let i = 0; i < 3; i++) {
        const particleCount = 40 * (timeLeft / duration)
        confetti({
          ...defaults,
          particleCount,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
        })
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        className="min-h-screen w-screen bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: "url('/milan_bg_30.png')",
        //   // background: "linear-gradient(135deg, #141E30, #243B55)",
        //   marginLeft: "calc(50% - 50vw)",
        //   marginRight: "calc(50% - 50vw)",
        //   width: "100vw",
        // }}
      >
        {/* About Milan with background image */}
        <section
          aria-labelledby="about-heading"
          className="relative isolate flex items-center justify-center w-screen"
          style={{ height: "100vh", marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
          <img
            src="/WhatsApp Image 2025-10-17 at 15.07.43.jpeg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
          <div className="relative z-10 text-center px-6">
            <h1 className={`${gravitas.className} text-white text-[4rem] md:text-[8rem] lg:text-[12rem] leading-tight font-normal`}>
              MILAN
            </h1>

            <p className="mt-8 max-w-4xl mx-auto md:text-lg lg:text-2xl text-white/90 leading-relaxed">
              MILAN stands as one of the largest and most eagerly awaited inter-hostel competitions in India. It is a thrilling showcase of talent and spirit, uniting students in a vibrant and dynamic celebration.
            </p>
            <p className="mt-8 max-w-4xl mx-auto md:text-lg lg:text-2xl text-white/90 leading-relaxed">
              With each passing year, participation in this General Championship has been on the rise, contributing to an atmosphere of heightened enthusiasm and camaraderie. Drawing over 6,000+ attendees.
            </p>
          </div>
        </section>

        {/* Aftermovie embedded video */}
        <section
          className="w-screen px-4 py-10 md:py-14 text-center"
          style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
          <h2 className="text-3xl font-semibold mb-6">Aftermovie</h2>
          <div className="mx-auto aspect-video w-[90%] md:w-[85%] overflow-hidden rounded-lg border">
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
        <section
          className="w-screen px-4 py-10 md:py-14 text-center"
          style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        >
          <h2 className="text-3xl font-semibold mb-6">Theme</h2>
          <div className="mx-auto w-[90%] md:w-[85%] mt-6 grid items-stretch gap-6 md:grid-cols-2">
            <div className="h-full">
              <img
                src="/WhatsApp Image 2025-10-17 at 02.42.39.jpeg"
                alt="Vibrant lights and stage representing this year's theme"
                className="w-full h-full rounded-lg border object-cover"
              />
            </div>
            <div className="h-full rounded-2xl border bg-gradient-to-r from-purple-500/80 to-pink-600/80 text-white p-6 shadow-lg flex items-center">
              <p className="text-pretty">
                This year’s theme celebrates audacity and unity—bringing together performers, athletes, and innovators to push boundaries and create unforgettable moments. Expect bolder stages, tighter competitions, and a community-driven spirit throughout the festival.
              </p>
            </div>
          </div>
        </section>

        {/* Mascot */}
        <section className="py-10 md:py-14">
          <div className="mx-auto w-[90%] md:w-[85%] text-center">
            <h2 className="text-3xl font-semibold mb-6">Mascot</h2>
            <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
              <div className="order-2 md:order-1 h-full rounded-2xl border bg-gradient-to-r from-purple-600/80 to-pink-500/80 text-white p-6 shadow-lg flex items-center">
                <p className="text-pretty">
                  Pablo is a curious, energetic red panda embodying Carpe Diem—"Seize the Day." His holographic hand symbolizes the act of seizing opportunity in the digital age. Dressed in futuristic gear with Indian motifs and jutti-inspired shoes, Pablo blends heritage and innovation—bold, indigenous, and always ready to grasp the moment.✨
                </p>
              </div>
              <div className="order-1 md:order-2 h-full">
                <img
                  src="/WhatsApp Image 2025-10-17 at 02.42.38.jpeg"
                  alt="Milan mascot illustration"
                  className="mx-auto w-full h-full max-w-sm rounded-lg border object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Leaderboard & Block Race Toggle */}
        <section className="mx-auto w-[90%] md:w-[85%] px-6 py-10 md:py-14">
          <div className="mb-6 flex items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === "leaderboard" ? "bg-gray-200 text-gray-700" : "bg-black text-white"
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("blockrace")}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === "blockrace" ? "bg-gray-200 text-gray-700" : "bg-black text-white"
              }`}
            >
              Block Race
            </button>
          </div>

          {activeTab === "leaderboard" && (
            <div>
              <Leaderboard />
              <a href="/leaderboard" className="text-sm text-sky-600 hover:underline block text-right mt-2">
                View full board
              </a>
            </div>
          )}

          {activeTab === "blockrace" && (
            <div className="w-full overflow-hidden rounded-lg border">
              <iframe
                src="https://flo.uri.sh/visualisation/25360055/embed"
                title="Block Race"
                frameBorder="0"
                scrolling="no"
                style={{ width: "100%", height: "600px" }}
                sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                allowFullScreen
              />
              <div className="w-full mt-2 text-right">
                <a
                  className="text-xs text-gray-500 hover:underline"
                  href="https://public.flourish.studio/visualisation/25360055/?utm_source=embed&utm_campaign=visualisation/25360055"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    alt="Made with Flourish"
                    src="https://public.flourish.studio/resources/made_with_flourish.svg"
                    className="inline-block w-[105px] h-[16px] border-0"
                  />
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Sponsors */}
        <section
          className="w-full px-4 py-10 md:py-14"
          style={{
            marginLeft: "calc(50% - 50vw)",
            marginRight: "calc(50% - 50vw)",
            width: "100vw",
          }}
        >
          <div className="mx-auto w-full text-center space-y-6">
            <h2 className="text-3xl font-semibold">Our Sponsors</h2>
            <SponsorsCarousel />
          </div>
        </section>

        {/* Chatbot */}
        <ChatbotFAB />
      </div>
    </>
  )
}
