import { GalleryGrid } from "@/components/gallery-grid"
import {Button } from "@/components/ui/button"

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl py-10 md:py-14">
      <h1 className="mb-6 text-2xl font-bold">Gallery</h1>

      <div className="mb-6">
        
         <a 
          href="https://drive.google.com/your-link-here" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button>View Drive Folder</Button>
        </a>

      </div>


      {/* <GalleryGrid /> */}
    </div>
  )
}