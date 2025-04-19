"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ShippingQuotes, Quote } from "@/types/shipping"
import { Clock, DollarSign } from "lucide-react"

interface QuotesCardProps {
  data: ShippingQuotes | null
}

export function QuotesCard({ data }: QuotesCardProps) {
  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex items-center justify-center h-32 text-gray-400">
          Waiting for shipping quotes...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Available Shipping Options</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {data.quotes.map((quote, index) => (
          <QuoteItem key={index} quote={quote} isSelected={index === data.selectedIndex} />
        ))}
      </CardContent>
    </Card>
  )
}

interface QuoteItemProps {
  quote: Quote
  isSelected: boolean
}

function QuoteItem({ quote, isSelected }: QuoteItemProps) {
  return (
    <div className={`border rounded-lg p-4 ${isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img
              src={`/carriers/${quote.carrier.toLowerCase()}.svg`}
              alt={quote.carrier}
              className="max-w-full max-h-full"
            />
          </div>
          <div>
            <h3 className="font-medium">{quote.carrier}</h3>
            <p className="text-sm text-gray-500">{quote.service}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>${quote.cost.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{quote.estimatedDelivery}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
