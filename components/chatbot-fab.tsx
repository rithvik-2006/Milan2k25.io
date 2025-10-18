"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ChatbotFAB() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-sky-500 text-white hover:bg-sky-600"
        aria-label="Open help"
      >
        <MessageCircle className="mr-2 size-4" />
        Help
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full max-w-md">
          <SheetHeader>
            <SheetTitle>Need help?</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-3">
            <p className="text-sm text-muted-foreground">
              Ask anything about events, registration, or schedules. This is a simple helper UI (no AI backend yet).
            </p>
            <Input placeholder="Your name (optional)" />
            <Textarea placeholder="Type your question..." rows={6} />
            <Button className="bg-sky-500 text-white hover:bg-sky-600">Send</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
