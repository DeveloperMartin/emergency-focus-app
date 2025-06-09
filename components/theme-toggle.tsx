"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Evitar hidratación incorrecta
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="opacity-70 hover:opacity-100"
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "opacity-0"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
