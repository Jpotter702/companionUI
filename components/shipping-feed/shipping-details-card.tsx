"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingDetails } from "@/types/shipping"
import { Package2 } from "lucide-react"

interface ShippingDetailsCardProps {
  data: ShippingDetails | null
}

export function ShippingDetailsCard({ data }: ShippingDetailsCardProps) {
  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex items-center justify-center h-32 text-gray-400">
          Waiting for shipping details...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Package2 className="h-5 w-5" />
          Package Information
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Origin</p>
            <p className="text-lg font-semibold">{data.originZip}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Destination</p>
            <p className="text-lg font-semibold">{data.destinationZip}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Weight</p>
            <p className="text-lg font-semibold">{data.weight} lbs</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
