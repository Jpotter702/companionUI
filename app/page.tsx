import dynamic from "next/dynamic"

// Use dynamic import with SSR disabled to prevent WebSocket errors during server rendering
const ShippingFeedPage = dynamic(() => import("@/shipping-feed"), { ssr: false })

export default function Home() {
  return <ShippingFeedPage />
}
