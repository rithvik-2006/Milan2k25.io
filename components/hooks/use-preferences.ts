"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

export type LikedDomain = "sports_boys" | "sports_girls" | "culti" | "techy"

export type Preferences = {
  email?: string
  hostel?: string
  likedDomains: LikedDomain[]
  preferredEventIds: string[]
}

const STORAGE_KEY = "milan-preferences-v1"

const defaultPreferences: Preferences = {
  email: "",
  hostel: "",
  likedDomains: [],
  preferredEventIds: [],
}

export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
      if (raw) {
        setPreferences({ ...defaultPreferences, ...JSON.parse(raw) })
      }
    } catch {
      // ignore
    } finally {
      setLoaded(true)
    }
  }, [])

  const save = useCallback((next: Preferences) => {
    setPreferences(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }, [])

  const update = useCallback(
    (partial: Partial<Preferences>) => {
      save({ ...preferences, ...partial })
    },
    [preferences, save],
  )

  const reset = useCallback(() => save(defaultPreferences), [save])

  return useMemo(
    () => ({ preferences, setPreferences: save, updatePreferences: update, resetPreferences: reset, loaded }),
    [preferences, save, update, reset, loaded],
  )
}
