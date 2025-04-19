"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { LabelData } from "@/types/shipping"
import { FileText, Printer, Mail, QrCode } from "lucide-react"

interface LabelCardProps {
  data: LabelData | null
}

export function LabelCard({ data }: LabelCardProps) {
  if (!data) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex items-center justify-center h-32 text-gray-400">
          Waiting for shipping label...
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Shipping Label
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="aspect-[8.5/11] bg-white border shadow-sm mx-auto max-w-md">
            <iframe src={data.labelPdfUrl} className="w-full h-full" title="Shipping Label" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col items-center p-4 border rounded-lg">
            <QrCode className="h-24 w-24 mb-2" />
            <p className="text-sm text-center text-gray-500 mt-2">Scan to track your package</p>
            <p className="text-xs font-mono mt-1">{data.trackingNumber}</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Label
            </Button>
            <Button variant="outline" className="w-full flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Label
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
