import { isPayloadOfSchemaTypeWithMeta, Payload } from '@xyo-network/payload-model'

export const CreditCardInputSchema = 'network.xyo.credit.card.input' as const
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

export const isCreditCardInput = isPayloadOfSchemaTypeWithMeta<CreditCardInput>(CreditCardInputSchema)
