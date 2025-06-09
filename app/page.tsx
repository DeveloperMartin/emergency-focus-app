"use client"

import { Progress } from "@/components/ui/progress"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield } from "lucide-react"

export default function EmergencyFocusApp() {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)

  const handleEmergencyButton = () => {
    setIsEmergencyMode(true)

    // Simular reset después de 10 segundos
    setTimeout(() => {
      setIsEmergencyMode(false)
    }, 10000)
  }

  if (isEmergencyMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Modo Emergencia Activado</CardTitle>
            <CardDescription>Respira profundo. Estás aquí, en este momento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg font-medium text-gray-700">Pregúntate:</div>
            <div className="space-y-2 text-left">
              <p className="text-sm">• ¿Qué estoy tratando de lograr realmente?</p>
              <p className="text-sm">• ¿Esta actividad me acerca a mis objetivos?</p>
              <p className="text-sm">• ¿Puedo definir una tarea específica ahora?</p>
            </div>
            <div className="pt-4">
              <div className="text-sm text-gray-500 mb-2">Regresando al dashboard en...</div>
              <Progress value={100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Centro de Enfoque</h1>
          <p className="text-gray-600 text-lg">Mantén tu mente en el aquí y ahora</p>
        </div>

        <Button
          onClick={handleEmergencyButton}
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Shield className="w-8 h-8 mr-3" />
          BOTÓN DE EMERGENCIA
        </Button>

        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Presiona este botón cuando sientas que estás perdiendo el enfoque o necesites reconectar con el momento
          presente.
        </p>
      </div>
    </div>
  )
}
