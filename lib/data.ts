export type Event = {
  id: string
  name: string
  category: "Sports-Boys" | "Sports-Girls" | "Cultural" | "Technical"
  date: string
  startTime: string
  location: string
  description: string
  cover?: string
}

export type Scores = {
  id: string
  name: string
  category: "Sports-Boys" | "Sports-Girls" | "Cultural" | "Technical"
  scores: Record<string, number> 
}

export type TeamMember = {
  id: string
  name: string
  role: string
  dept: string
  year: string
  avatar?: string
}

export type Sponsor = {
  id: string
  name: string
  logo?: string
  tier: "Gold" | "Silver" | "Bronze"
}

export type GalleryItem = {
  id: string
  type: "photo" | "video"
  src: string
  alt: string
}

export const events: Event[] = [
  {
    id: "e1",
    name: "5K Milan Run",
    category: "Sports-Girls",
    date: "2025-10-05", // only date part
    startTime: "06:30:00", // new
    location: "Central Arena",
    description: "A thrilling 5K run across the campus — lace up and chase the clock!",
    cover: "/festival-event-banner.png",
  },
  {
    id: "cricket-final",
    name: "Cricket Final",
    category: "Sports-Boys",
    date: "2025-10-10",
    startTime: "17:00:00",
    location: "Main Ground",
    description: "Inter-hostel cricket final",
  },
  {
    id: "e2",
    name: "Battle of Bands",
    category: "Cultural",
    date: "2025-10-10",
    startTime: "20:00:00",
    location: "Main Stage",
    description: "Bands compete live with crowd votes and judges’ picks.",
    cover: "/concert-stage-lights.png",
  },
  {
    id: "e3",
    name: "HackSprint 12h",
    category: "Technical",
    date: "2025-10-02",
    startTime: "09:00:00",
    location: "Innovation Lab",
    description: "Rapid prototyping hackathon—bring your best ideas!",
    cover: "/hackathon-coding-team.png",
  },
]

export const scores: Scores[] = [
  {
    id: "s1",
    name: "volleyball",
    category: "Sports-Boys",
    scores: {
      "Hostel A": 10,
      "Hostel B": 7,
      "Hostel C": 5,
      "Hostel D": 0,
    },
  }
]

export const team: TeamMember[] = [
  { id: "t1", name: "Aarav Singh", role: "Festival Lead", dept: "CSE", year: "IV" },
  { id: "t2", name: "Diya Iyer", role: "Operations", dept: "ECE", year: "III" },
  { id: "t3", name: "Kabir Shah", role: "Sponsorships", dept: "MBA", year: "II" },
  { id: "t4", name: "Meera N", role: "Creatives", dept: "Design", year: "II" },
]

export const sponsors: Sponsor[] = [
  { id: "s1", name: "Alumni_Assosciation", logo: "/SPONSERS/Alumni_Association.png", tier: "Gold" },
  { id: "s2", name: "ICICI",logo : "/SPONSERS/ICICI.png", tier: "Silver" },
  { id: "s3", name: "Isthara",logo: "/SPONSERS/Isthara.png", tier: "Bronze" },
  { id: "s4", name: "SKPL", logo: "/SPONSERS/SKPL.png",tier: "Gold" },
  { id: "s5", name: "Safexpress", logo: "/SPONSERS/Safexpress.png",tier: "Silver" },
  { id: "s6", name: "Frescos", logo: "/SPONSERS/frescos.png",tier: "Silver" },
  { id: "s5", name: "Skechers", logo: "/SPONSERS/Skechers.png",tier: "Silver" },
]


export const gallery: GalleryItem[] = [
  { id: "g1", type: "photo", src: "/concert-crowd-cheering.png", alt: "Concert crowd cheering" },
  { id: "g2", type: "photo", src: "/runners-starting-line.png", alt: "Runners at the starting line" },
  { id: "g3", type: "photo", src: "/hackathon-coding.png", alt: "Hackathon teams coding" },
  { id: "g4", type: "photo", src: "/festival-food-stalls.png", alt: "Festival food stalls" },
]

export const testimonials = [
  {
    id: "c1",
    quote: "Milan is the highlight of our year—electrifying energy and unforgettable moments!",
    name: "Riya Patel",
  },
  {
    id: "c2",
    quote: "The perfect blend of competitions, culture, and community.",
    name: "Arjun Mehta",
  },
  {
    id: "c3",
    quote: "From hackathons to concerts—there’s something for everyone.",
    name: "Zara Khan",
  },
]