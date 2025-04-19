"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingConfirmation } from "@/types/shipping"
import { MapPin, Package } from "lucide-react"

interface ConfirmationCardProps {
  data: ShippingConfirmation | null
}

export function ConfirmationCard({ data }: ConfirmationCardProps) {
  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex items-center justify-center h-32 text-gray-400">
          Waiting for shipping confirmation...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Shipping Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">From</h3>
                <address className="not-italic text-sm text-gray-600">
                  {data.fromAddress.name}
                  <br />
                  {data.fromAddress.street}
                  <br />
                  {data.fromAddress.city}, {data.fromAddress.state} {data.fromAddress.zip}
                </address>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <h3 className="font-medium">To</h3>
                <address className="not-italic text-sm text-gray-600">
                  {data.toAddress.name}
                  <br />
                  {data.toAddress.street}
                  <br />
                  {data.toAddress.city}, {data.toAddress.state} {data.toAddress.zip}
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-start gap-2">
            <Package className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <h3 className="font-medium">Package Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2 text-sm">
                <div>
                  <span className="text-gray-500">Weight:</span> {data.packageDetails.weight} lbs
                </div>
                <div>
                  <span className="text-gray-500">Dimensions:</span> {data.packageDetails.dimensions}
                </div>
                <div>
                  <span className="text-gray-500">Service:</span> {data.packageDetails.service}
                </div>
                <div>
                  <span className="text-gray-500">Carrier:</span> {data.packageDetails.carrier}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
