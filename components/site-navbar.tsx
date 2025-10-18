"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// import { ModeToggle } from "./theme-toggle"
import { Menu, X, LogOut } from "lucide-react"
import { auth } from "@/lib/firebase"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/calendar", label: "Calendar" },
  { href: "/team", label: "Team" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/gallery", label: "Gallery" },
]

const ADMIN_EMAILS = [
  "admin1@iith.ac.in",
  "admin2@iith.ac.in",
  "sportshead@iith.ac.in",
]

export function SiteNavbar() {
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser)
      setIsAdmin(ADMIN_EMAILS.includes(currentUser?.email ?? ""))
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src="/Milan-logo.png" alt="Milan Logo" className="h-10 w-10" />
          <span className="text-balance">Milan</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <>
              <Link
                href="/profile"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Profile
              </Link>

              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Admin
                </Link>
              )}

              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </>
          )}

          {!user && (
            <Link
              href="/login"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </Link>
          )}

          {/* <ModeToggle /> */}
        </nav>

        {/* Mobile menu */}
        <div className="flex items-center gap-2 md:hidden">
          {/* <ModeToggle /> */}
          <Button
            variant="outline"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-2 px-4 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-2 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Profile
                  </Link>

                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Admin
                    </Link>
                  )}

                  <Button
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="flex items-center gap-2 w-full"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </Button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
