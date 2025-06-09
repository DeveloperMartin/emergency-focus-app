import type { ButtonPressData, PatternAnalysis, WeeklyPattern, HourlyPattern } from "./types"

// Simulación de base de datos local (en producción sería una DB real)
const STORAGE_KEY = "emergency-button-presses"

export async function saveButtonPress(pressData: ButtonPressData): Promise<void> {
  try {
    const existing = localStorage.getItem(STORAGE_KEY)
    const presses: ButtonPressData[] = existing ? JSON.parse(existing) : []

    presses.push(pressData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presses))

    // En producción, aquí haríamos una llamada a la API
    // await fetch('/api/button-press', { method: 'POST', body: JSON.stringify(pressData) })
  } catch (error) {
    console.error("Error saving button press:", error)
  }
}

export async function getButtonPressHistory(): Promise<ButtonPressData[]> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []

    const presses = JSON.parse(stored)
    // Convertir strings de fecha de vuelta a objetos Date
    return presses.map((press: any) => ({
      ...press,
      timestamp: new Date(press.timestamp),
    }))
  } catch (error) {
    console.error("Error loading button press history:", error)
    return []
  }
}

export function analyzePatterns(presses: ButtonPressData[]): PatternAnalysis {
  // Inicializar patrones
  const weeklyPattern: WeeklyPattern[] = Array.from({ length: 7 }, (_, i) => ({
    dayOfWeek: i,
    frequency: 0,
  }))

  const hourlyPattern: HourlyPattern[] = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    frequency: 0,
  }))

  // Contar frecuencias
  presses.forEach((press) => {
    weeklyPattern[press.dayOfWeek].frequency++
    hourlyPattern[press.hour].frequency++
  })

  // Calcular gap promedio entre presiones
  const gaps = presses.filter((press) => press.previousPressGap !== null).map((press) => press.previousPressGap!)

  const averageGap = gaps.length > 0 ? gaps.reduce((a, b) => a + b, 0) / gaps.length : 0

  // Determinar tipo de patrón
  let patternType: "normal" | "obsessive" | "excessive" = "normal"

  // Detectar patrón excesivo (gaps muy cortos entre presiones)
  const shortGaps = gaps.filter((gap) => gap < 15000) // Menos de 15 segundos
  if (shortGaps.length > 3) {
    patternType = "excessive"
  }
  // Detectar patrón obsesivo (alta frecuencia en días específicos)
  else if (weeklyPattern.some((day) => day.frequency > 5)) {
    patternType = "obsessive"
  }

  return {
    weeklyPattern,
    hourlyPattern,
    patternType,
    totalPresses: presses.length,
    averageGapBetweenPresses: averageGap,
  }
}

// Función para correlacionar con datos externos (ej: Figma)
export async function correlateFigmaActivity(date: Date): Promise<any> {
  // En producción, esto haría una llamada a la API de Figma
  // return await fetch(`/api/figma/activity?date=${date.toISOString()}`)

  // Simulación
  return {
    boardsCreated: Math.floor(Math.random() * 5),
    timeSpent: Math.floor(Math.random() * 120), // minutos
    collaborators: Math.floor(Math.random() * 3),
  }
}
