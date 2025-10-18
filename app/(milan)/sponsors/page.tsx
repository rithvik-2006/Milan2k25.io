import Image from "next/image"
// import { SponsorsCarousel } from "@/components/sponsors-carousel"

// Static list of images in public/SPONSERS. If you add images, append their filenames here.
const sponsorImages = [
  "/SPONSERS/Safexpress.png",
  "/SPONSERS/frescos.png",
  "/SPONSERS/Alumni_Association.png",
  "/SPONSERS/ICICI.png",
  "/SPONSERS/Skechers.png",
  "/SPONSERS/Isthara.png",
  "/SPONSERS/SKPL.png",
]

export default function SponsorsPage() {
  return (
    <div className="mx-auto max-w-7xl  py-10 md:py-14">
      <h1 className="mb-6 text-3xl font-bold">Our Sponsors</h1>

      {/* 3-column grid of sponsor images */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 items-center">
        {sponsorImages.map((src) => (
          <div key={src} className="flex items-center justify-center bg-white p-4  rounded-lg shadow-sm">
            {/* square box to ensure equal width and height */}
            <div className="relative w-full max-w-[200px]  bg-white aspect-square rounded-xl">
              <Image
                src={src}
                alt={src.split("/").pop()?.replace(/\.[^.]+$/, "") || "sponsor"}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 160px, 240px"
              />
            </div>
          </div>
        ))}
      </div>
      {/* <SponsorsCarousel /> */}
      <p className="mt-6 text-sm text-muted-foreground">
        Interested in sponsoring? Contact us at sponsors@milanfest.example
      </p>
    </div>
  )
}