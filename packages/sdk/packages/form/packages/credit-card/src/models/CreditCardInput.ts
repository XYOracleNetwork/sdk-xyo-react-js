import type { Payload } from '@xyo-network/payload-model'
import { asSchema, isPayloadOfSchemaType } from '@xyo-network/payload-model'

export const CreditCardInputSchema = asSchema('network.xyo.credit.card.input', true)
export type CreditCardInputSchema = typeof CreditCardInputSchema

export type CreditCardInputFields = {
  cardNumber: string
  cvc: string
  emailAddress: string
  expiration: string
  firstName: string
  lastName: string
  timestamp: number
  zip: string
}

export type CreditCardInput = Payload<CreditCardInputFields, CreditCardInputSchema>

export const isCreditCardInput = isPayloadOfSchemaType<CreditCardInput>(CreditCardInputSchema)
