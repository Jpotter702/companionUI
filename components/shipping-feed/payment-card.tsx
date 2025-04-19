"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PaymentData } from "@/types/shipping"
import { CreditCard, Calendar, Lock } from "lucide-react"

interface PaymentCardProps {
  data: PaymentData | null
}

export function PaymentCard({ data }: PaymentCardProps) {
  const [cardNumber, setCardNumber] = useState(data?.cardNumber || "")
  const [expiryDate, setExpiryDate] = useState(data?.expiryDate || "")
  const [cvv, setCvv] = useState(data?.cvv || "")
  const [cardholderName, setCardholderName] = useState(data?.cardholderName || "")

  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex items-center justify-center h-32 text-gray-400">
          Waiting for payment information...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="cardholder-name">Cardholder Name</Label>
            <Input
              id="cardholder-name"
              placeholder="John Doe"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <div className="relative">
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="flex gap-1">
                  <img src="/cards/visa.svg" alt="Visa" className="h-6 w-auto" />
                  <img src="/cards/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
                  <img src="/cards/amex.svg" alt="American Express" className="h-6 w-auto" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <div className="relative">
                <Input
                  id="expiry-date"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <div className="relative">
                <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Your payment information is encrypted and secure
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
