"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-10 md:px-6">
        {/* Logo and heading (center top) */}
        <div className="flex flex-col items-center text-center mb-8">
          <img
            src="/Milan-logo.png" // ✅ Logo from public folder
            alt="Milan Logo"
            className="h-20 w-20 mb-5"
          />
          <h2 className="text-xl font-semibold">MILAN</h2>
          <p className="text-sm text-muted-foreground">
            The General Championship of IIT Hyderabad
          </p>
        </div>

        {/* 3 sections below: Follow / Location / Contact */}
        <div className="grid gap-8 md:grid-cols-3 text-center">
          {/* Follow */}
          <div>
            <p className="mb-3 font-medium">Follow</p>
            <div className="flex justify-center gap-3 text-sm text-muted-foreground">
              <Link
                href="https://www.instagram.com/milan.iithyd/?hl=en"
                target="_blank"
                className="hover:text-foreground"
                aria-label="Instagram"
              >
                Instagram
              </Link>
              <Link
                href="https://in.linkedin.com/company/milanthegc"
                target="_blank"
                className="hover:text-foreground"
                aria-label="LinkedIn"
              >
                LinkedIn
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCLmZ3AcvOulm1-TFdgqngTw"
                target="_blank"
                className="hover:text-foreground"
                aria-label="YouTube"
              >
                YouTube
              </Link>
            </div>
          </div>

          {/* Location */}
          <div>
            <p className="mb-3 font-medium">Location</p>
            <p className="text-sm text-muted-foreground">
              Indian Institute of Technology Hyderabad
              <br />
              Near NH-65, Sangareddy, Kandi
              <br />
              Telangana 502285
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 font-medium">Contact</p>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <p>G Vinod Chandra Kumar</p>
              <a
                href="tel:+91 7569544424"
                className="hover:text-foreground"
                aria-label="Phone"
              >
                +91 00000 00000
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        ©️ {new Date().getFullYear()} Milan. All rights reserved.
      </div>
    </footer>
  )
}
