"use client"

import { Brain, Moon, TreePine, Coffee, Gamepad2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { PatternAnalysis } from "@/lib/types"

interface EmergencyModeProps {
  recommendationType: "normal" | "excessive" | "obsessive"
  patternAnalysis: PatternAnalysis | null
}

export function EmergencyMode({ recommendationType, patternAnalysis }: EmergencyModeProps) {
  const getRecommendations = () => {
    switch (recommendationType) {
      case "excessive":
        return {
          title: "Patrón Excesivo Detectado",
          subtitle: "Parece que estás en un punto crítico",
          questions: [
            "¿No deberías dormir una siesta?",
            "¿Qué tal si sales a caminar un poco?",
            "¿Podrías hacer algo que no involucre pantallas?",
          ],
          activities: [
            { icon: Moon, text: "Tomar una siesta de 20-30 minutos" },
            { icon: TreePine, text: "Salir a caminar al aire libre" },
            { icon: Coffee, text: "Preparar una bebida caliente" },
          ],
          color: "orange",
        }

      case "obsessive":
        return {
          title: "Patrón Obsesivo Detectado",
          subtitle: "Hay un patrón en tu comportamiento",
          questions: [
            "¿Qué estás evitando hacer realmente?",
            "¿Este patrón se repite en ciertos días?",
            "¿Hay algo específico que te genera ansiedad?",
          ],
          activities: [
            { icon: Brain, text: "Reflexionar sobre el patrón detectado" },
            { icon: Gamepad2, text: "Cambiar de actividad completamente" },
            { icon: Coffee, text: "Hacer una pausa consciente" },
          ],
          color: "purple",
        }

      default:
        return {
          title: "Modo Emergencia Activado",
          subtitle: "Respira profundo. Estás aquí, en este momento.",
          questions: [
            "¿Qué estoy tratando de lograr realmente?",
            "¿Esta actividad me acerca a mis objetivos?",
            "¿Puedo definir una tarea específica ahora?",
          ],
          activities: [],
          color: "blue",
        }
    }
  }

  const recommendations = getRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center border-none shadow-xl bg-white dark:bg-slate-900">
        <CardHeader>
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Brain className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle
            className={`text-2xl ${
              recommendations.color === "orange"
                ? "text-orange-600 dark:text-orange-400"
                : recommendations.color === "purple"
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-blue-600 dark:text-blue-400"
            }`}
          >
            {recommendations.title}
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-300">{recommendations.subtitle}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="text-lg font-medium text-slate-700 dark:text-slate-200">Pregúntate:</div>

          <div className="space-y-3 text-left">
            {recommendations.questions.map((question, index) => (
              <p
                key={index}
                className={`text-sm flex items-start gap-2 ${
                  index === 0 && recommendationType !== "normal"
                    ? `${recommendations.color === "orange" ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20" : "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20"} font-medium p-2 rounded`
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                <span
                  className={`${
                    recommendations.color === "orange"
                      ? "text-orange-500"
                      : recommendations.color === "purple"
                        ? "text-purple-500"
                        : "text-blue-500"
                  }`}
                >
                  •
                </span>
                {question}
              </p>
            ))}
          </div>

          {recommendations.activities.length > 0 && (
            <div className="space-y-3">
              <div className="text-lg font-medium text-slate-700 dark:text-slate-200">Recomendaciones:</div>
              <div className="space-y-2">
                {recommendations.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <activity.icon
                      className={`w-5 h-5 ${
                        recommendations.color === "orange"
                          ? "text-orange-500"
                          : recommendations.color === "purple"
                            ? "text-purple-500"
                            : "text-blue-500"
                      }`}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{activity.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Esta pantalla se cerrará automáticamente en 10 segundos
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
