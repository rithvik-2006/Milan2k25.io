"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  person: { name: string; roll: string; photo: string };
  role?: "Overall Coordinator" | "Head" | "Coordinator" | "HR";
  className?: string;
};

export const PersonCard = React.memo(function PersonCard({
  person,
  role,
  className,
}: Props) {
  return (
    <article
      tabIndex={0}
      aria-label={`${role ? role + ": " : ""}${person.name}`}
      className={cn(
        "flex flex-col items-center gap-4 p-3 text-center transition-transform duration-300 hover:scale-105 focus-visible:scale-105",
        className
      )}
    >
      <div className="relative w-44 h-56 overflow-hidden rounded-md shadow-md">
        <Image
          src={person.photo || "/placeholder.svg"}
          alt={`${person.name} portrait`}
          fill
          sizes="176px"
          loading="eager" // ✅ eager load
          quality={70} // ✅ compress image
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold tracking-wide">{person.name}</h3>
        {role && (
          <span className="mt-1 text-xs font-medium text-white uppercase tracking-wide">
            {role}
          </span>
        )}
      </div>
    </article>
  );
});