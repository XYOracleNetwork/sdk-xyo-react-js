import { assertEx } from '@xylabs/assert'

import { CreditCardInput, CreditCardInputSchema } from '../../models/index.js'

export const validateCreditCardInputs = (values: CreditCardInput): CreditCardInput => {
  return {
    cardNumber: assertEx(values.cardNumber, () => 'card number is not a string') as string,
    cvc: assertEx(values.cvc, () => 'card cvc is not a string') as string,
    emailAddress: assertEx(values.emailAddress, () => 'email is not a string') as string,
    expiration: assertEx(values.expiration, () => 'card expiration is not a string') as string,
    firstName: assertEx(values.firstName, () => 'first name is not a string') as string,
    lastName: assertEx(values.lastName, () => 'last name is not a string') as string,
    schema: CreditCardInputSchema,
    timestamp: assertEx(values.timestamp, () => 'timestamp is not a number') as number,
    zip: assertEx(values.zip, () => 'zip is not a string') as string,
  }
}
