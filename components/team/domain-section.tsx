import type { DomainTeam } from "@/lib/team"
import { PersonCard } from "./person-card"

export function DomainSection({ domain }: { domain: DomainTeam }) {
  return (
    <section aria-labelledby={`domain-${domain.name}`} className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 id={`domain-${domain.name}`} className="text-xl font-semibold text-pretty">
          {domain.name}
        </h2>
      </div>

      {/* Heads */}
      {domain.heads.length > 0 && (
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Heads</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domain.heads.map((p) => (
              <PersonCard key={p.roll} person={p} role="Head" />
            ))}
          </div>
        </div>
      )}

      {/* Coordinators */}
      {domain.coordinators.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Coordinators</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {domain.coordinators.map((p) => (
              <PersonCard key={p.roll} person={p} role="Coordinator" />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
