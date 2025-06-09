"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Shield, ChevronDown, Code, Lightbulb, Github, BarChart3 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FutureIdeasPanel } from "@/components/future-ideas-panel"
import { EmergencyMode } from "@/components/emergency-mode"
import { AnalyticsPanel } from "@/components/analytics-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { saveButtonPress, getButtonPressHistory, analyzePatterns } from "@/lib/analytics"
import type { ButtonPressData, PatternAnalysis } from "@/lib/types"

export default function EmergencyFocusApp() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)
  const [showFutureIdeas, setShowFutureIdeas] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)
  const [showDevInfo, setShowDevInfo] = useState(false)
  const [buttonPresses, setButtonPresses] = useState<ButtonPressData[]>([])
  const [patternAnalysis, setPatternAnalysis] = useState<PatternAnalysis | null>(null)

  // Cargar historial al iniciar
  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    const history = await getButtonPressHistory()
    setButtonPresses(history)
    const analysis = analyzePatterns(history)
    setPatternAnalysis(analysis)
  }

  const handleEmergencyButton = async () => {
    const now = new Date()

    // Crear registro de la presión del botón
    const pressData: ButtonPressData = {
      id: crypto.randomUUID(),
      timestamp: now,
      dayOfWeek: now.getDay(), // 0 = Domingo, 1 = Lunes, etc.
      hour: now.getHours(),
      userId: "user-1", // En producción esto vendría de autenticación
      sessionId: crypto.randomUUID(),
      previousPressGap:
        buttonPresses.length > 0
          ? now.getTime() - new Date(buttonPresses[buttonPresses.length - 1].timestamp).getTime()
          : null,
    }

    // Guardar en base de datos
    await saveButtonPress(pressData)

    // Actualizar estado local
    const updatedPresses = [...buttonPresses, pressData]
    setButtonPresses(updatedPresses)

    // Analizar patrones actualizados
    const analysis = analyzePatterns(updatedPresses)
    setPatternAnalysis(analysis)

    setIsEmergencyMode(true)

    // Reset después de 10 segundos
    setTimeout(() => {
      setIsEmergencyMode(false)
    }, 10000)
  }

  // Determinar tipo de recomendación basado en patrones
  const getRecommendationType = () => {
    if (!patternAnalysis) return "normal"

    const recentPresses = buttonPresses.filter(
      (press) => new Date().getTime() - new Date(press.timestamp).getTime() < 60000,
    )

    // Detectar patrón excesivo (más de 3 presiones en 1 minuto con gaps cortos)
    const isExcessive =
      recentPresses.length > 3 &&
      recentPresses.some((press) => press.previousPressGap && press.previousPressGap < 15000)

    // Detectar patrón obsesivo (uso frecuente en días/horarios específicos)
    const isObsessive =
      patternAnalysis.weeklyPattern.some((day) => day.frequency > 5) ||
      patternAnalysis.hourlyPattern.some((hour) => hour.frequency > 3)

    if (isExcessive) return "excessive"
    if (isObsessive) return "obsessive"
    return "normal"
  }

  if (isEmergencyMode) {
    return <EmergencyMode recommendationType={getRecommendationType()} patternAnalysis={patternAnalysis} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950 flex flex-col">
      <header className="w-full p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-30 hover:opacity-100 transition-opacity"
                  onClick={() => setShowDevInfo(!showDevInfo)}
                >
                  <Code size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Información para desarrolladores</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-30 hover:opacity-100 transition-opacity"
                  onClick={() => setShowAnalytics(true)}
                >
                  <BarChart3 size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver análisis de patrones</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <AnimatePresence>
            {showDevInfo && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <a
                  href="https://github.com/DeveloperMartin/emergency-focus-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">v2.0.0</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center space-y-8 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Centro de Enfoque
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">Mantén tu mente en el aquí y ahora</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button
              onClick={handleEmergencyButton}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-8 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-red-500/20 transition-all duration-300"
            >
              <Shield className="w-8 h-8 mr-3" />
              BOTÓN DE EMERGENCIA
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto"
          >
            Presiona este botón cuando sientas que estás perdiendo el enfoque o necesites reconectar con el momento
            presente.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-8"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFutureIdeas(true)}
              className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 flex items-center gap-2"
            >
              <Lightbulb size={16} />
              <span>Ideas para el futuro</span>
              <ChevronDown size={14} />
            </Button>
          </motion.div>
        </div>
      </main>

      <AnimatePresence>
        {showFutureIdeas && <FutureIdeasPanel onClose={() => setShowFutureIdeas(false)} />}
        {showAnalytics && patternAnalysis && (
          <AnalyticsPanel
            onClose={() => setShowAnalytics(false)}
            analysis={patternAnalysis}
            buttonPresses={buttonPresses}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
