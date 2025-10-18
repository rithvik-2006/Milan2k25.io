// "use client"

// import { useState, useMemo } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { getAuth } from "firebase/auth"

// // Domain options
// const DOMAIN_OPTIONS = [
//   { key: "sports", label: "Sports" },
//   { key: "culti", label: "Cultural" },
//   { key: "techy", label: "Technical" },
// ] as const
// type LikedDomain = typeof DOMAIN_OPTIONS[number]["key"]

// // All events
// const ALL_EVENTS: { id: string; title: string; category: LikedDomain }[] = [
//   // Sports
//   { id: "8-ball-pool", title: "8 Ball Pool", category: "sports" },
//   { id: "badminton", title: "Badminton", category: "sports" },
//   { id: "table-tennis", title: "Table Tennis", category: "sports" },
//   { id: "squash", title: "Squash", category: "sports" },
//   { id: "carroms", title: "Carroms", category: "sports" },
//   { id: "basketball", title: "Basketball", category: "sports" },
//   { id: "chess", title: "Chess", category: "sports" },
//   { id: "volleyball", title: "Volleyball", category: "sports" },
//   { id: "tennis", title: "Tennis", category: "sports" },
//   { id: "athletics", title: "Athletics", category: "sports" },
//   { id: "aquatics", title: "Aquatics", category: "sports" },
//   { id: "dodge-ball", title: "Dodge Ball", category: "sports" },
//   { id: "powerlifting", title: "Powerlifting", category: "sports" },
//   { id: "weightlifting", title: "Weightlifting", category: "sports" },

//   // Cultural
//   { id: "75hr-film", title: "75 Hr Film Making Starts Theme Reveal", category: "culti" },
//   { id: "photo-story", title: "Photo Story Challenge starts", category: "culti" },
//   { id: "theme-photo", title: "Theme Based Photography Challenge starts", category: "culti" },
//   { id: "weave-a-tale", title: "Weave a tale (ALH-1)", category: "culti" },
//   { id: "anime-quiz", title: "Anime Quiz (ALH-2)", category: "culti" },
//   { id: "solo-singing", title: "SOLO SINGING (AUDI)", category: "culti" },
//   { id: "fashion-show", title: "Silhouettes (Fashion Show) (AUDI)", category: "culti" },
//   { id: "litsoc-writing", title: "LITSOC Writing (Black Out Poetry) ALH-2", category: "culti" },
//   { id: "gesture-painting", title: "GESTURE Painting (ALH-1)", category: "culti" },
//   { id: "standup-comedy", title: "STAND UP COMEDY (OAT)", category: "culti" },
//   { id: "framed", title: "FRAMED (ALH-1)", category: "culti" },
//   { id: "otaku-cosplay", title: "OTAKU (COSPLAY) AUDI", category: "culti" },
//   { id: "debate-bpd", title: "DEBATE BPD ALH-1", category: "culti" },
//   { id: "solo-dance", title: "SOLO DANCE (AUDI)", category: "culti" },
//   { id: "btl-screening", title: "BTL SCREENING (AUDI)", category: "culti" },
//   { id: "litsoc-quiz", title: "LITSOC GENERAL QUIZ (CLH-2)", category: "culti" },
//   { id: "group-dance", title: "GROUP DANCE (OAT)/LHC-5", category: "culti" },
//   { id: "debate-apd", title: "DEBATE APD ALH-1", category: "culti" },
//   { id: "duo-trio", title: "DUO/TRIO (AUDI)", category: "culti" },
//   { id: "battle-of-bands", title: "Battle of Bands (Stage)", category: "culti" },

//   // Technical
//   { id: "glitch-game-jam", title: "GLITCH - Game Jam & Website game", category: "techy" },
//   { id: "epoch-audio-ml", title: "EPOCH - Audio Reconstruction with ML", category: "techy" },
//   { id: "lambda-hackathon", title: "Lambda Hackathon", category: "techy" },
//   { id: "ctf25", title: "MILAN CTF25", category: "techy" },
//   { id: "rdm-improve-game", title: "RDM IMPROVE GAME (AUDI)", category: "techy" },
// ]

// export default function PreferencesForm() {
//   const [email, setEmail] = useState("")
//   const [hostel, setHostel] = useState("")
//   const [likedDomains, setLikedDomains] = useState<LikedDomain[]>([])
//   const [preferredEventIds, setPreferredEventIds] = useState<string[]>([])
//   const [saving, setSaving] = useState(false)

//   const toggleDomain = (key: LikedDomain, checked: boolean) => {
//     const updated = checked ? [...likedDomains, key] : likedDomains.filter((d) => d !== key)
//     setLikedDomains(updated)

//     // Remove events not in selected domains
//     setPreferredEventIds((prev) =>
//       prev.filter((id) => {
//         const ev = ALL_EVENTS.find((e) => e.id === id)
//         return ev && updated.includes(ev.category)
//       })
//     )
//   }

//   const toggleEvent = (id: string, checked: boolean) => {
//     setPreferredEventIds((prev) =>
//       checked ? [...prev, id] : prev.filter((evId) => evId !== id)
//     )
//   }

//   const filteredEvents = useMemo(() => {
//     if (likedDomains.length === 0) return []
//     return ALL_EVENTS.filter((ev) => likedDomains.includes(ev.category))
//   }, [likedDomains])

//   const selectAllEvents = () => {
//     const allIds = filteredEvents.map((ev) => ev.id)
//     setPreferredEventIds(allIds)
//   }

//   const onSave = async () => {
//     setSaving(true)
//     try {
//       const auth = getAuth()
//       const user = auth.currentUser
//       if (!user) throw new Error("User not logged in")

//       const token = await user.getIdToken()

//       // Log the data being sent
//       console.log("Sending preferences to backend:", {
//         preferredCategories: likedDomains,
//         preferredEventIds,
//         email,
//         hostel,
//       })

//       const res = await fetch("/api/user/preferences", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           preferredCategories: likedDomains,
//           preferredEventIds,
//           email,
//           hostel,
//         }),
//       })

//       // Log the backend response
//       const resData = await res.json()
//       console.log("Backend response:", resData)

//       if (!res.ok) {
//         throw new Error(resData.message || "Failed to save preferences")
//       }

//       alert("Preferences saved successfully!")
//     } catch (err: any) {
//       alert(err.message)
//     } finally {
//       setSaving(false)
//     }
//   }

//   return (
//     <Card className="max-w-3xl mx-auto">
//       <CardHeader className="text-center">
//         <CardTitle>Profile & Preferences</CardTitle>
//         <CardDescription>We’ll tailor Milan updates and reminders based on your choices.</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-6">
//         <div className="grid gap-5 md:grid-cols-2">
//           {/* <div className="space-y-2">
//             <Label>Email (for reminders)</Label>
//             <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
//           </div> */}
//           <div className="space-y-2">
//             <Label>Hostel</Label>
//             <Input value={hostel} onChange={(e) => setHostel(e.target.value)} placeholder="Enter your hostel" />
//           </div>
//         </div>

//         <div className="space-y-3">
//           <Label>Domains you like</Label>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//             {DOMAIN_OPTIONS.map((opt) => (
//               <label key={opt.key} className="flex items-center gap-3 rounded-md border p-3 cursor-pointer">
//                 <Checkbox
//                   checked={likedDomains.includes(opt.key)}
//                   onCheckedChange={(v) => toggleDomain(opt.key, Boolean(v))}
//                   aria-label={opt.label}
//                 />
//                 <span>{opt.label}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <Label>Preferred events to track</Label>
//             <Button size="sm" onClick={selectAllEvents}>Select All</Button>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-auto rounded-md border p-2">
//             {filteredEvents.length === 0 && <p className="text-sm text-muted-foreground">Select a domain to see events</p>}
//             {filteredEvents.map((ev) => (
//               <label key={ev.id} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer">
//                 <Checkbox
//                   checked={preferredEventIds.includes(ev.id)}
//                   onCheckedChange={(v) => toggleEvent(ev.id, Boolean(v))}
//                 />
//                 <span>{ev.title} <span className="text-muted-foreground">• {ev.category}</span></span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex justify-center">
//           <Button onClick={onSave} disabled={saving}>
//             {saving ? "Saving..." : "Save Preferences"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAuth } from "firebase/auth";

const DOMAIN_OPTIONS = [
  { key: "sports", label: "Sports" },
  { key: "culti", label: "Cultural" },
  { key: "techy", label: "Technical" },
] as const;

type LikedDomain = typeof DOMAIN_OPTIONS[number]["key"];

interface Event {
  id: string;
  title: string;
  category: LikedDomain;
}

const ALL_EVENTS: { id: string; title: string; category: LikedDomain }[] = [
  // Sports
  { id: "8-ball-pool", title: "8 Ball Pool", category: "sports" },
  { id: "badminton", title: "Badminton", category: "sports" },
  { id: "table-tennis", title: "Table Tennis", category: "sports" },
  { id: "squash", title: "Squash", category: "sports" },
  { id: "carroms", title: "Carroms", category: "sports" },
  { id: "basketball", title: "Basketball", category: "sports" },
  { id: "chess", title: "Chess", category: "sports" },
  { id: "volleyball", title: "Volleyball", category: "sports" },
  { id: "tennis", title: "Tennis", category: "sports" },
  { id: "athletics", title: "Athletics", category: "sports" },
  { id: "aquatics", title: "Aquatics", category: "sports" },
  { id: "dodge-ball", title: "Dodge Ball", category: "sports" },
  { id: "powerlifting", title: "Powerlifting", category: "sports" },
  { id: "weightlifting", title: "Weightlifting", category: "sports" },

  // Cultural
  { id: "75hr-film", title: "75 Hr Film Making Starts Theme Reveal", category: "culti" },
  { id: "photo-story", title: "Photo Story Challenge starts", category: "culti" },
  { id: "theme-photo", title: "Theme Based Photography Challenge starts", category: "culti" },
  { id: "weave-a-tale", title: "Weave a tale (ALH-1)", category: "culti" },
  { id: "anime-quiz", title: "Anime Quiz (ALH-2)", category: "culti" },
  { id: "solo-singing", title: "SOLO SINGING (AUDI)", category: "culti" },
  { id: "fashion-show", title: "Silhouettes (Fashion Show) (AUDI)", category: "culti" },
  { id: "litsoc-writing", title: "LITSOC Writing (Black Out Poetry) ALH-2", category: "culti" },
  { id: "gesture-painting", title: "GESTURE Painting (ALH-1)", category: "culti" },
  { id: "standup-comedy", title: "STAND UP COMEDY (OAT)", category: "culti" },
  { id: "framed", title: "FRAMED (ALH-1)", category: "culti" },
  { id: "otaku-cosplay", title: "OTAKU (COSPLAY) AUDI", category: "culti" },
  { id: "debate-bpd", title: "DEBATE BPD ALH-1", category: "culti" },
  { id: "solo-dance", title: "SOLO DANCE (AUDI)", category: "culti" },
  { id: "btl-screening", title: "BTL SCREENING (AUDI)", category: "culti" },
  { id: "litsoc-quiz", title: "LITSOC GENERAL QUIZ (CLH-2)", category: "culti" },
  { id: "group-dance", title: "GROUP DANCE (OAT)/LHC-5", category: "culti" },
  { id: "debate-apd", title: "DEBATE APD ALH-1", category: "culti" },
  { id: "duo-trio", title: "DUO/TRIO (AUDI)", category: "culti" },
  { id: "battle-of-bands", title: "Battle of Bands (Stage)", category: "culti" },

  // Technical
  { id: "glitch-game-jam", title: "GLITCH - Game Jam & Website game", category: "techy" },
  { id: "epoch-audio-ml", title: "EPOCH - Audio Reconstruction with ML", category: "techy" },
  { id: "lambda-hackathon", title: "Lambda Hackathon", category: "techy" },
  { id: "ctf25", title: "MILAN CTF25", category: "techy" },
  { id: "rdm-improve-game", title: "RDM IMPROVE GAME (AUDI)", category: "techy" },
];

export default function PreferencesForm() {
  const [email, setEmail] = useState("");
  const [hostel, setHostel] = useState("");
  const [likedDomains, setLikedDomains] = useState<LikedDomain[]>([]);
  const [preferredEventIds, setPreferredEventIds] = useState<string[]>([]);
  const [openDomains, setOpenDomains] = useState<LikedDomain[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchPreferences() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) throw new Error("User not logged in");

        const token = await user.getIdToken();

        const res = await fetch("/api/user/preferences", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch preferences");

        const preferredIds: string[] = data.preferredEventIds || [];
        setPreferredEventIds(preferredIds);

        const domains: LikedDomain[] = [];
        preferredIds.forEach((id) => {
          const ev = ALL_EVENTS.find((event) => event.id === id);
          if (ev && !domains.includes(ev.category)) {
            domains.push(ev.category);
          }
        });
        setLikedDomains(domains);
        setOpenDomains(domains);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred";
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchPreferences();
  }, []);

  const toggleDomain = (key: LikedDomain, checked: boolean) => {
    let updated: LikedDomain[];
    if (checked) {
      updated = [...likedDomains, key];
      setOpenDomains((prev) => [...prev, key]);
    } else {
      updated = likedDomains.filter((d) => d !== key);
      setOpenDomains((prev) => prev.filter((d) => d !== key));
      setPreferredEventIds((prev) =>
        prev.filter((id) => {
          const ev = ALL_EVENTS.find((e) => e.id === id);
          return ev && updated.includes(ev.category);
        })
      );
    }
    setLikedDomains(updated);
  };

  const toggleDropdown = (domain: LikedDomain) => {
    setOpenDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const eventsByDomain = (domain: LikedDomain) =>
    ALL_EVENTS.filter((ev) => ev.category === domain);

  const toggleEvent = (id: string, checked: boolean) => {
    setPreferredEventIds((prev) =>
      checked ? [...prev, id] : prev.filter((evId) => evId !== id)
    );
  };

  const selectAllEvents = () => {
    const allIds = likedDomains.flatMap((domain) =>
      ALL_EVENTS.filter((e) => e.category === domain).map((ev) => ev.id)
    );
    setPreferredEventIds(allIds);
  };

  const onSave = async () => {
    setSaving(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not logged in");

      const token = await user.getIdToken();

      const res = await fetch("/api/user/preferences", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          preferredCategories: likedDomains,
          preferredEventIds,
          email,
          hostel,
        }),
      });

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.message || "Failed to save preferences");

      alert("Preferences saved successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Get preferred events grouped by category
  const getPreferredEventsByCategory = () => {
    const grouped: Record<LikedDomain, Event[]> = {
      sports: [],
      culti: [],
      techy: [],
    };

    preferredEventIds.forEach((id) => {
      const event = ALL_EVENTS.find((e) => e.id === id);
      if (event) {
        grouped[event.category].push(event);
      }
    });

    return grouped;
  };

  if (loading) return <div className="flex items-center justify-center p-8">Loading preferences...</div>;

  const preferredEventsByCategory = getPreferredEventsByCategory();
  const hasPreferredEvents = preferredEventIds.length > 0;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Current Preferences Summary */}
      {hasPreferredEvents && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Current Preferences</CardTitle>
            <CardDescription>
              Events you're currently tracking ({preferredEventIds.length} selected)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {DOMAIN_OPTIONS.map((domain) => {
                const events = preferredEventsByCategory[domain.key];
                if (events.length === 0) return null;

                return (
                  <div key={domain.key} className="space-y-2">
                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                      {domain.label} ({events.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {events.map((event) => (
                        <span
                          key={event.id}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                          {event.title}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preferences Form */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Profile & Preferences</CardTitle>
          <CardDescription>
            We'll tailor Milan updates and reminders based on your choices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Hostel</Label>
              <Input
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                placeholder="Enter your hostel"
              />
            </div>
          </div>

          <div>
            <Label>Domains you like</Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
              {DOMAIN_OPTIONS.map((opt) => {
                const isSelected = likedDomains.includes(opt.key);
                const isOpen = openDomains.includes(opt.key);

                return (
                  <div key={opt.key} className="border rounded-md">
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer select-none"
                      onClick={() => {
                        if (isSelected) toggleDropdown(opt.key);
                        else toggleDomain(opt.key, true);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(v) => toggleDomain(opt.key, Boolean(v))}
                          aria-label={opt.label}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span>{opt.label}</span>
                      </div>
                      {isSelected && (
                        <span className="text-lg select-none">
                          {isOpen ? "▾" : "▸"}
                        </span>
                      )}
                    </div>

                    {isSelected && isOpen && (
                      <div className="p-3 border-t max-h-64 overflow-auto">
                        {eventsByDomain(opt.key).map((ev) => (
                          <label
                            key={ev.id}
                            className="flex items-center gap-3 p-1 rounded cursor-pointer hover:bg-muted/50"
                          >
                            <Checkbox
                              checked={preferredEventIds.includes(ev.id)}
                              onCheckedChange={(v) => toggleEvent(ev.id, Boolean(v))}
                            />
                            <span>{ev.title}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button onClick={selectAllEvents} disabled={likedDomains.length === 0}>
              Select All Events in Selected Domains
            </Button>
            <Button onClick={onSave} disabled={saving}>
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}