"use client"

import { motion } from "framer-motion"
import { X, ArrowRight, Star, Users, Bell, Brain, Lock, Calendar, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FutureIdeasPanelProps {
  onClose: () => void
}

// Lista de ideas futuras para el proyecto
const futureIdeas = [
  {
    title: "Análisis de patrones con IA",
    description:
      "Implementar algoritmos de aprendizaje automático para detectar patrones de distracción personalizados",
    icon: Brain,
    difficulty: "Alta",
  },
  {
    title: "Notificaciones inteligentes",
    description: "Alertas contextuales basadas en tu comportamiento y horarios habituales",
    icon: Bell,
    difficulty: "Media",
  },
  {
    title: "Modo colaborativo",
    description: "Compartir sesiones de enfoque con amigos o compañeros de trabajo",
    icon: Users,
    difficulty: "Media",
  },
  {
    title: "Integración con calendarios",
    description: "Sincronización con Google Calendar para alinear el enfoque con tus compromisos",
    icon: Calendar,
    difficulty: "Baja",
  },
  {
    title: "Estadísticas avanzadas",
    description: "Visualizaciones detalladas de tus patrones de atención y productividad",
    icon: BarChart,
    difficulty: "Media",
  },
  {
    title: "Modo privacidad mejorado",
    description: "Opciones avanzadas para controlar qué datos se recopilan y almacenan",
    icon: Lock,
    difficulty: "Baja",
  },
]

export function FutureIdeasPanel({ onClose }: FutureIdeasPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white dark:bg-slate-900 p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Ideas para el futuro
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          <p className="text-slate-600 dark:text-slate-300">
            Estas son algunas ideas para mejorar la aplicación en el futuro. ¿Tienes alguna sugerencia? ¡Contribuye al
            proyecto!
          </p>

          <div className="space-y-4">
            {futureIdeas.map((idea, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl"
              >
                <div className="flex gap-3">
                  <div className="mt-1">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                      <idea.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-slate-800 dark:text-slate-200">{idea.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          idea.difficulty === "Alta"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : idea.difficulty === "Media"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {idea.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{idea.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={onClose}>
              <span>Contribuir al proyecto</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
