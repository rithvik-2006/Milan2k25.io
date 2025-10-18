"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { MonthView } from "@/components/calendar/month-view";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";

type AnyEvent = {
  id: string;
  title?: string;
  name?: string;
  date: string; // "YYYY-MM-DD"
  startTime?: string; // "HH:MM:SS"
  category: "Sports-Boys" | "Sports-Girls" | "Cultural" | "Technical";
  hostel?: string;
  team?: string;
};

const CATEGORY_OPTIONS = [
  "All",
  "Sports-Boys",
  "Sports-Girls",
  "Cultural",
  "Technical",
] as const;

function parseDateTime(ev: AnyEvent): Date | null {
  if (!ev.date) return null;
  try {
    const [year, month, day] = ev.date.split("-").map(Number);
    let hour = 0,
      minute = 0;
    if (ev.startTime) {
      const [h, m] = ev.startTime.split(":");
      hour = Number(h) || 0;
      minute = Number(m) || 0;
    }
    return new Date(year, month - 1, day, hour, minute);
  } catch {
    return null;
  }
}

function eventTitle(ev: AnyEvent) {
  return ev.title || ev.name || "Untitled Event";
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function EventsCalendar() {
  const [events, setEvents] = useState<AnyEvent[]>([]);
  const [preferredEventIds, setPreferredEventIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] =
    useState<(typeof CATEGORY_OPTIONS)[number]>("All");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [now, setNow] = useState(Date.now());
  const timeoutsRef = useRef<number[]>([]);

  // Fetch preferred event IDs
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        const token = await user.getIdToken(true);
        const res = await fetch("/api/user/preferences", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPreferredEventIds(data.preferredEventIds || []);
      } catch (err: any) {
        console.error(err);
        toast({
          title: "Failed to fetch preferences",
          description: err.message,
        });
      }
    };
    fetchPreferences();
  }, []);

  // Fetch all events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch events");
        const data: AnyEvent[] = await res.json();
        setEvents(data);
      } catch (err: any) {
        toast({ title: "Failed to fetch events", description: err.message });
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const upcoming = useMemo(
    () =>
      events
        .filter((ev) => {
          const dt = parseDateTime(ev);
          return !dt || dt.getTime() >= now;
        })
        .sort(
          (a, b) =>
            (parseDateTime(a)?.getTime() ?? 0) -
            (parseDateTime(b)?.getTime() ?? 0)
        ),
    [events, now]
  );

  const effectiveDate = selectedDate ?? new Date();

  const matchesSelectedDate = (ev: AnyEvent) => {
    const dt = parseDateTime(ev);
    if (!dt) return false;
    return isSameDay(dt, effectiveDate);
  };

  // Preferred events: name/title contains any string from preferredEventIds
  const preferredFiltered = useMemo(
    () =>
      upcoming.filter(
        (ev) =>
          preferredEventIds.some((id) =>
            (ev.title ?? ev.name ?? "").toLowerCase().includes(id.toLowerCase())
          ) &&
          matchesSelectedDate(ev) &&
          (categoryFilter === "All" || ev.category === categoryFilter)
      ),
    [upcoming, preferredEventIds, categoryFilter, effectiveDate]
  );

  // Other events: the rest
  const othersFiltered = useMemo(
    () =>
      upcoming.filter(
        (ev) =>
          !preferredEventIds.some((id) =>
            (ev.title ?? ev.name ?? "").toLowerCase().includes(id.toLowerCase())
          ) &&
          matchesSelectedDate(ev) &&
          (categoryFilter === "All" || ev.category === categoryFilter)
      ),
    [upcoming, preferredEventIds, categoryFilter, effectiveDate]
  );

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => window.clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Toolbar */}
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORY_OPTIONS.map((opt) => (
            <Button
              key={opt}
              size="sm"
              variant={categoryFilter === opt ? "default" : "outline"}
              onClick={() => setCategoryFilter(opt)}
              aria-pressed={categoryFilter === opt}
            >
              {opt}
            </Button>
          ))}
          {selectedDate && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSelectedDate(null)}
            >
              Clear Date
            </Button>
          )}
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Tip: Click a day in the calendar to focus events for that date.
        </p>
      </div>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-2 ">
        <div className="order-1 lg:order-none p-2 border-0.5 rounded-2xl border border-white">
          <MonthView
            events={upcoming.map((ev) => ({
              ...ev,
              title: ev.title || ev.name || "Untitled Event",
            }))}
            selectedDate={selectedDate ?? undefined}
            onSelectDate={(d) => setSelectedDate(d)}
          />
        </div>

        <div className="space-y-8 ">
          {/* Preferred Events */}
          <Card className="max-h-[400px] overflow-hidden border-white">
            <CardHeader className="text-center">
              <CardTitle>
                {selectedDate
                  ? `Preferred Events on ${format(
                    effectiveDate,
                    "EEEE, MMM d yyyy"
                  )}`
                  : `Preferred Events Today`}
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[300px]">
              {preferredFiltered.length ? (
                <ul className="space-y-3">
                  {preferredFiltered.map((ev) => {
                    const dt = parseDateTime(ev);
                    return (
                      <li key={ev.id} className="rounded-md border p-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="font-medium">{eventTitle(ev)}</p>
                            <p className="text-sm text-muted-foreground">
                              {ev.category}{" "}
                              {dt
                                ? `• ${format(dt, "MMM d, yyyy")} ${ev.startTime ?? ""
                                }`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  No preferred upcoming events on this date.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Other Events */}
          <Card className="max-h-[400px] overflow-hidden border-white">
            <CardHeader className="text-center">
              <CardTitle>Other Events</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[300px]">
              {othersFiltered.length ? (
                <ul className="space-y-3">
                  {othersFiltered.map((ev) => {
                    const dt = parseDateTime(ev);
                    return (
                      <li key={ev.id} className="rounded-md border p-3">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <div>
                            <p className="font-medium">{eventTitle(ev)}</p>
                            <p className="text-sm text-muted-foreground">
                              {ev.category}{" "}
                              {dt
                                ? `• ${format(dt, "MMM d, yyyy")} ${ev.startTime ?? ""
                                }`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground text-center">
                  No other upcoming events on this date.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
