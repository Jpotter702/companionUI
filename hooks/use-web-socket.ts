"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { mockShippingData } from "@/mock-data"

// Define message interface for type safety
interface WebSocketMessage {
  data: any
  type: string
}

interface WebSocketOptions {
  url: string
  reconnectInterval?: number
  maxReconnectAttempts?: number
}

// Helper function to check if we're in a preview environment
function isPreviewEnvironment() {
  if (typeof window === "undefined") return true // SSR

  return (
    window.location.hostname.includes("vercel.app") ||
    window.location.hostname.includes("codesandbox.io") ||
    window.location.hostname.includes("localhost") ||
    window.location.hostname.includes("127.0.0.1") ||
    // Add any other preview domains you use
    window.location.hostname === ""
  )
}

export function useWebSocket({ url, reconnectInterval = 3000, maxReconnectAttempts = 5 }: WebSocketOptions) {
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null)
  const [error, setError] = useState<Error | null>(null)

  // Determine if we should use fallback immediately
  const shouldUseFallback = !url || url === "wss://your-websocket-endpoint.com" || isPreviewEnvironment()

  const [useFallback, setUseFallback] = useState(shouldUseFallback)

  const webSocketRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttemptsRef = useRef(0)

  // Function to simulate WebSocket messages with mock data
  const simulateMockMessages = useCallback(() => {
    console.log("Using mock data fallback")

    // Helper function to create a mock message
    const createMockMessage = (data: any): WebSocketMessage => ({
      data: JSON.stringify(data),
      type: "message",
    })

    // Simulate initial data
    setTimeout(() => {
      setLastMessage(
        createMockMessage({
          currentStep: 0,
          details: mockShippingData.details,
        }),
      )
    }, 1000)

    // Simulate step progression
    const steps = [
      { step: 1, data: { currentStep: 1, quotes: mockShippingData.quotes } },
      { step: 2, data: { currentStep: 2, confirmation: mockShippingData.confirmation } },
      { step: 3, data: { currentStep: 3, payment: mockShippingData.payment } },
      { step: 4, data: { currentStep: 4, label: mockShippingData.label } },
    ]

    let currentStepIndex = 0
    const interval = setInterval(() => {
      if (currentStepIndex < steps.length) {
        setLastMessage(createMockMessage(steps[currentStepIndex].data))
        currentStepIndex++
      } else {
        clearInterval(interval)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Only attempt to connect if we're not using fallback
  useEffect(() => {
    // If we should use fallback, don't even try to connect
    if (useFallback) {
      simulateMockMessages()
      return
    }

    // Only try to connect in browser environment
    if (typeof window === "undefined") return

    let socket: WebSocket
    let connectionTimeout: NodeJS.Timeout

    try {
      console.log("Attempting to connect to WebSocket:", url)

      // Set a timeout to switch to fallback if connection takes too long
      connectionTimeout = setTimeout(() => {
        console.log("WebSocket connection timed out")
        setUseFallback(true)
      }, 5000)

      socket = new WebSocket(url)
      webSocketRef.current = socket

      socket.addEventListener("open", () => {
        console.log("WebSocket connection established")
        clearTimeout(connectionTimeout)
        setIsConnected(true)
        setError(null)
        reconnectAttemptsRef.current = 0
      })

      socket.addEventListener("message", (event) => {
        try {
          const parsedData = JSON.parse(event.data)
          setLastMessage({
            data: event.data,
            type: "message",
          })
        } catch (err) {
          console.error("Error parsing WebSocket message:", err)
          setLastMessage({
            data: event.data,
            type: "message",
          })
        }
      })

      socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed:", event)
        setIsConnected(false)

        // Try to reconnect unless we're using the fallback
        if (!useFallback && reconnectAttemptsRef.current < maxReconnectAttempts) {
          reconnectAttemptsRef.current += 1
          const delay = reconnectInterval * Math.pow(1.5, reconnectAttemptsRef.current - 1)

          console.log(`Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts}) in ${delay}ms`)

          reconnectTimeoutRef.current = setTimeout(() => {
            // This will trigger a re-render and attempt reconnection
            setError(new Error("Connection closed. Reconnecting..."))
          }, delay)
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          console.log("Max reconnection attempts reached, switching to fallback mode")
          setUseFallback(true)
        }
      })

      socket.addEventListener("error", (err) => {
        console.error("WebSocket error:", err)
        setError(new Error("Failed to connect to WebSocket server"))
        setUseFallback(true)
      })
    } catch (err) {
      console.error("Error creating WebSocket:", err)
      setError(err instanceof Error ? err : new Error("Unknown WebSocket error"))
      setUseFallback(true)
      clearTimeout(connectionTimeout)
    }

    // Clean up on unmount
    return () => {
      if (connectionTimeout) clearTimeout(connectionTimeout)

      if (webSocketRef.current) {
        try {
          webSocketRef.current.close()
        } catch (err) {
          console.error("Error closing WebSocket:", err)
        }
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [url, reconnectInterval, maxReconnectAttempts, useFallback, simulateMockMessages])

  // Function to send messages
  const sendMessage = useCallback(
    (data: string | object) => {
      if (useFallback) {
        console.log("Mock send message:", data)
        return
      }

      if (webSocketRef.current && webSocketRef.current.readyState === WebSocket.OPEN) {
        const message = typeof data === "string" ? data : JSON.stringify(data)
        webSocketRef.current.send(message)
      } else {
        console.error("WebSocket is not connected")
      }
    },
    [useFallback],
  )

  return { isConnected, lastMessage, sendMessage, error, useFallback }
}
