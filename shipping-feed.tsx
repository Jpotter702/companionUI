"use client"

import { useEffect, useState } from "react"
import { ShippingFeed } from "@/components/shipping-feed/shipping-feed"
import { useWebSocket } from "@/hooks/use-web-socket"
import type { ShippingData } from "@/types/shipping"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Mock initial data
const initialData: ShippingData = {
  currentStep: 0,
  details: null,
  quotes: null,
  confirmation: null,
  payment: null,
  label: null,
}

export default function ShippingFeedPage() {
  const [shippingData, setShippingData] = useState<ShippingData>(initialData)

  // Use the WebSocket hook with options
  const { lastMessage, error, useFallback } = useWebSocket({
    url: process.env.NEXT_PUBLIC_WEBSOCKET_URL || "wss://your-websocket-endpoint.com",
    reconnectInterval: 3000,
    maxReconnectAttempts: 5,
  })

  useEffect(() => {
    if (lastMessage) {
      try {
        // Parse the message if it's a string
        const data = typeof lastMessage.data === "string" ? JSON.parse(lastMessage.data) : lastMessage.data

        // Update the shipping data state
        setShippingData((prevData) => ({
          ...prevData,
          ...data,
        }))
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error)
      }
    }
  }, [lastMessage])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shipping Assistant</h1>

      {useFallback && (
        <Alert className="mb-6" variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Demo Mode</AlertTitle>
          <AlertDescription>
            Using simulated data. In production, this would connect to a real WebSocket server.
          </AlertDescription>
        </Alert>
      )}

      {error && !useFallback && (
        <Alert className="mb-6" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}

      <ShippingFeed data={shippingData} />
    </div>
  )
}
