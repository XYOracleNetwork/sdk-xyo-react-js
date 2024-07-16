import { assertEx } from '@xylabs/assert'

import { CreditCardInput, CreditCardInputSchema } from '../../models/index.js'

export const validateCreditCardInputs = (values: CreditCardInput): CreditCardInput => {
  return {
    cardNumber: assertEx(values.cardNumber, () => 'card number is not a string') as string,
    cvc: assertEx(values.cvc, () => 'card cvc is not a string') as string,
    emailAddress: assertEx(values.emailAddress, () => 'emailAddress is not a string') as string,
    expiration: assertEx(values.expiration, () => 'card expiration is not a string') as string,
    firstName: assertEx(values.firstName, () => 'first name is not a string') as string,
    lastName: assertEx(values.lastName, () => 'last name is not a string') as string,
    schema: CreditCardInputSchema,
    timestamp: values.timestamp,
    zip: assertEx(values.zip, () => 'zip is not a string') as string,
  }
}
