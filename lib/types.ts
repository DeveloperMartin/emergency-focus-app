export interface ButtonPressData {
  id: string
  timestamp: Date
  dayOfWeek: number // 0-6 (Domingo-Sábado)
  hour: number // 0-23
  userId: string
  sessionId: string
  previousPressGap: number | null // Milisegundos desde la presión anterior
}

export interface WeeklyPattern {
  dayOfWeek: number
  frequency: number
}

export interface HourlyPattern {
  hour: number
  frequency: number
}

export interface PatternAnalysis {
  weeklyPattern: WeeklyPattern[]
  hourlyPattern: HourlyPattern[]
  patternType: "normal" | "obsessive" | "excessive"
  totalPresses: number
  averageGapBetweenPresses: number
}
