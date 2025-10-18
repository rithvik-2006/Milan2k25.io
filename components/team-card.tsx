"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { TeamMember } from "@/lib/data"
import { motion } from "framer-motion"

export function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
    >
      <Card className="transition-transform hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={member.avatar || "/placeholder.svg?height=64&width=64&query=avatar"} alt={member.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{member.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            {member.dept} • Year {member.year}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
