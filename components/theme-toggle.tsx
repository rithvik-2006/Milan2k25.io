"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  if (!mounted) {
    // Hide icon swap until client hydration completes
    return (
      <Button
        variant="outline"
        size="icon"
        aria-label="Toggle theme"
        className="opacity-0 pointer-events-none bg-transparent"
      >
        <Sun className="size-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle theme"
      aria-pressed={resolvedTheme === "dark"}
      onClick={toggle}
      className="relative bg-transparent"
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
