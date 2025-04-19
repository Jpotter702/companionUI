"use client"

import { StepperAccordion } from "./stepper-accordion"
import { ShippingDetailsCard } from "./shipping-details-card"
import { QuotesCard } from "./quotes-card"
import { ConfirmationCard } from "./confirmation-card"
import { PaymentCard } from "./payment-card"
import { LabelCard } from "./label-card"
import type { ShippingData } from "@/types/shipping"

interface ShippingFeedProps {
  data: ShippingData
}

export function ShippingFeed({ data }: ShippingFeedProps) {
  const { currentStep, details, quotes, confirmation, payment, label } = data

  const steps = [
    {
      title: "Shipping Details",
      content: <ShippingDetailsCard data={details} />,
      isComplete: !!details,
      isActive: currentStep === 0,
    },
    {
      title: "Shipping Quotes",
      content: <QuotesCard data={quotes} />,
      isComplete: !!quotes,
      isActive: currentStep === 1,
    },
    {
      title: "Confirmation",
      content: <ConfirmationCard data={confirmation} />,
      isComplete: !!confirmation,
      isActive: currentStep === 2,
    },
    {
      title: "Payment",
      content: <PaymentCard data={payment} />,
      isComplete: !!payment,
      isActive: currentStep === 3,
    },
    {
      title: "Shipping Label",
      content: <LabelCard data={label} />,
      isComplete: !!label,
      isActive: currentStep === 4,
    },
  ]

  return <StepperAccordion steps={steps} currentStep={currentStep} />
}
