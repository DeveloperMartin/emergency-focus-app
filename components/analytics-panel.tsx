"use client"

import { motion } from "framer-motion"
import { X, TrendingUp, Calendar, Clock, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PatternAnalysis, ButtonPressData } from "@/lib/types"

interface AnalyticsPanelProps {
  onClose: () => void
  analysis: PatternAnalysis
  buttonPresses: ButtonPressData[]
}

const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

export function AnalyticsPanel({ onClose, analysis, buttonPresses }: AnalyticsPanelProps) {
  const getPatternInsight = () => {
    const highestDay = analysis.weeklyPattern.reduce((max, day) => (day.frequency > max.frequency ? day : max))

    const lowestDay = analysis.weeklyPattern.reduce((min, day) => (day.frequency < min.frequency ? day : min))

    return {
      highestDay: dayNames[highestDay.dayOfWeek],
      highestFreq: highestDay.frequency,
      lowestDay: dayNames[lowestDay.dayOfWeek],
      lowestFreq: lowestDay.frequency,
    }
  }

  const insight = getPatternInsight()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            Análisis de Patrones
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Resumen ejecutivo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Resumen de Patrones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Día más activo:</strong> {insight.highestDay} ({insight.highestFreq} usos)
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Día más tranquilo:</strong> {insight.lowestDay} ({insight.lowestFreq} usos)
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Total de usos:</strong> {buttonPresses.length}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    <strong>Patrón detectado:</strong> {analysis.patternType}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Patrón semanal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Patrón Semanal
              </CardTitle>
              <CardDescription>Frecuencia de uso por día de la semana</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.weeklyPattern.map((day) => (
                  <div key={day.dayOfWeek} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dayNames[day.dayOfWeek]}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max((day.frequency / Math.max(...analysis.weeklyPattern.map((d) => d.frequency))) * 100, 5)}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-8">{day.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Patrón horario */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-500" />
                Patrón Horario
              </CardTitle>
              <CardDescription>Horas del día con mayor actividad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2">
                {analysis.hourlyPattern
                  .filter((hour) => hour.frequency > 0)
                  .sort((a, b) => b.frequency - a.frequency)
                  .slice(0, 8)
                  .map((hour) => (
                    <div key={hour.hour} className="text-center p-2 bg-slate-50 dark:bg-slate-800 rounded">
                      <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                        {hour.hour.toString().padStart(2, "0")}:00
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{hour.frequency} usos</div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones basadas en patrones */}
          <Card>
            <CardHeader>
              <CardTitle>Recomendaciones Personalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {insight.highestFreq > 5 && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Patrón Obsesivo:</strong> Los {insight.highestDay} tienes alta actividad. Considera
                      planificar actividades alternativas para ese día.
                    </p>
                  </div>
                )}

                {analysis.patternType === "excessive" && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Patrón Excesivo:</strong> Detectamos uso repetitivo. Recomendamos actividades no digitales
                      cuando esto ocurra.
                    </p>
                  </div>
                )}

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Sugerencia:</strong> Considera establecer recordatorios preventivos durante tus horas de
                    mayor actividad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}
