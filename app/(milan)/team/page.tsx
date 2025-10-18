"use client";

import { useEffect } from "react";
import Image from "next/image";
import { TEAM_DATA, DomainTeam, Person } from "@/lib/team";
import { PersonCard } from "@/components/team/person-card";
import BackToTop from "@/components/back-to-top";
import React from "react";

// Preload all images (load once at start). Accept undefined entries and skip them.
function preloadImages(urls: (string | undefined)[]) {
  urls.forEach((url) => {
    if (!url) return;
    const img = new window.Image();
    img.src = url;
  });
}

// Separate memoized TeamMember to avoid re-declaration
const TeamMember = React.memo(function TeamMember({
  name,
  personImage,
  role,
  className,
}: {
  name: string;
  personImage?: string;
  role?: "Overall Coordinator" | "Head" | "Coordinator" | "HR";
  className?: string;
}) {
  const person = { name, roll: "", photo: personImage || "" };
  return (
    <div className={`flex flex-col items-center ${className || ""}`}>
      <PersonCard
        person={person}
        role={role}
        className="transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
});

export default function TeamPage() {
  const teams: DomainTeam[] = TEAM_DATA.domains || [];

  // preload all team photos
  useEffect(() => {
    const allImages: (string | undefined)[] = [
      TEAM_DATA.overallCoordinator.photo,
      ...teams.flatMap((team) => [
        ...team.heads.map((h) => h.photo || "/TEAM/Heads/Missing.png"),
        ...team.coordinators.map((c) => c.photo || "/TEAM/Coords/Missing.png"),
      ]),
    ];
    preloadImages(allImages);
  }, [teams]);

  return (
    <div className="relative w-full">
      {/* Background image (optimized with next/image) */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/assests/bg.jpg"
          alt="background"
          fill
          priority
          quality={70}
          loading="eager"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" aria-hidden />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full min-h-screen flex flex-col items-center">
        {/* Overall Coordinator */}
        <section className="w-full flex justify-center items-center my-10 md:my-16">
          <div className="flex flex-col items-center justify-between h-auto">
            <Image
              src={TEAM_DATA.overallCoordinator.photo || "/placeholder.svg"}
              alt="Overall Coordinator"
              width={256}
              height={256}
              priority
              loading="eager"
              className="object-cover rounded-full shadow-md ring-4 ring-gray-300"
            />
            <div className="flex flex-col items-center mt-6">
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                Overall Coordinator
              </h2>
              <p className="text-center mt-2 text-lg font-medium">
                {TEAM_DATA.overallCoordinator.name}
              </p>
            </div>
          </div>
        </section>

        {/* Team Sections */}
        {teams.map((team) => (
          <section
            key={team.name}
            className="w-full flex flex-col items-center justify-center my-12 md:my-20"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-center uppercase tracking-wide mb-8">
              {team.name}
            </h3>

            {/* Heads */}
            <div className="w-full flex items-center justify-center mb-12">
              <div
                className={`w-full max-w-5xl grid gap-8 ${team.heads.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"
                  }`}
              >
                {team.heads.map((head: Person) => (
                  <TeamMember
                    key={head.name}
                    name={head.name}
                    personImage={head.photo || "/TEAM/Heads/Missing.png"}
                    role="Head"
                  />
                ))}
              </div>
            </div>

            {/* Coordinators */}
            <div className="w-full flex items-center justify-center">
              <div
                className={`w-full max-w-6xl grid gap-8 ${team.coordinators.length < 3
                    ? "grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-3"
                  }`}
              >
                {team.coordinators.map((coord: Person) => (
                  <TeamMember
                    key={coord.name}
                    name={coord.name}
                    personImage={coord.photo || "/TEAM/Coords/Missing.png"}
                    role="Coordinator"
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <BackToTop />
      </div>
    </div>
  );
}