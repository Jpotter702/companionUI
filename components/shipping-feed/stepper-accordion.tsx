"use client"

import type { ReactNode } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"

interface Step {
  title: string
  content: ReactNode
  isComplete: boolean
  isActive: boolean
}

interface StepperAccordionProps {
  steps: Step[]
  currentStep: number
}

export function StepperAccordion({ steps, currentStep }: StepperAccordionProps) {
  return (
    <div className="relative">
      {/* Vertical line connecting steps */}
      <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-gray-200 z-0" />

      <Accordion type="multiple" defaultValue={[`step-${currentStep}`]} className="relative z-10">
        {steps.map((step, index) => (
          <AccordionItem
            key={`step-${index}`}
            value={`step-${index}`}
            className={cn(
              "border-b border-l-0 border-r-0 border-t-0 pl-12 relative",
              step.isActive && "bg-gray-50 rounded-md",
            )}
          >
            {/* Step number or check icon */}
            <div
              className={cn(
                "absolute left-0 top-3 flex items-center justify-center w-12 h-12 rounded-full border-2",
                step.isComplete ? "border-green-500 bg-green-50" : "border-gray-300 bg-white",
              )}
            >
              {step.isComplete ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : (
                <span className={cn("text-lg font-semibold", step.isActive ? "text-gray-900" : "text-gray-500")}>
                  {index + 1}
                </span>
              )}
            </div>

            <AccordionTrigger
              className={cn("py-4 hover:no-underline", step.isActive ? "text-gray-900 font-medium" : "text-gray-500")}
            >
              {step.title}
            </AccordionTrigger>

            <AccordionContent className="pt-2 pb-4">{step.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
