import type { ReactNode } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"

export default function MilanLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteNavbar />
      <main className="container mx-auto px-4 md:px-6">{children}</main>
      <SiteFooter />
    </div>
  )
}
