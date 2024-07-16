import { AmexIcon, DiscoverIcon, MastercardIcon, VisaIcon } from '../../img/index.js'

export interface CreditCardInfo {
  icon: string
  name: string
}

export interface CreditCardOptions {
  amex: CreditCardInfo
  discover: CreditCardInfo
  mastercard: CreditCardInfo
  visa: CreditCardInfo
}

export const CreditCardData: CreditCardOptions = {
  amex: { icon: AmexIcon, name: 'American Express' },
  discover: { icon: DiscoverIcon, name: 'Discover' },
  mastercard: { icon: MastercardIcon, name: 'Mastercard' },
  visa: { icon: VisaIcon, name: 'Visa' },
}
