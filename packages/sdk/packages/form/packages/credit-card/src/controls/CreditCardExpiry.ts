import { assertEx } from '@xylabs/assert'
import type { EmptyObject } from '@xylabs/object'
import type { AbstractControl } from '@xyo-network/react-form-group'
import { FormControlBase } from '@xyo-network/react-form-group'
import valid from 'card-validator'

import { unmask } from '../utils/index.ts'

const CONTROL_NAME = 'expiration'

export class CreditCardExpirationFormControl<TProps extends EmptyObject = EmptyObject> extends FormControlBase {
  override invalidMessage = 'Card Expiration is invalid'

  override pattern = /^\d{0,4}$/
  override patternStrict = /^\d{1,4}$/

  override props = {
    autoComplete: 'cc-exp',
    autoCorrect: 'off',
    id: CONTROL_NAME,
    inputMode: 'numeric',
    name: CONTROL_NAME,
    placeholder: 'MM / YY',
    spellCheck: false,
  } as TProps

  override required = true

  override unmask = unmask

  private _cardNumberFormControl: AbstractControl | undefined = undefined

  constructor() {
    super()
    super.setName(CONTROL_NAME)
    this.setSerializeSettings({ sensitive: true, serializable: true })
  }

  get cardNumberFormControl() {
    return assertEx(this._cardNumberFormControl, () => 'Card number form control is not set')
  }

  // make it so the raw value is the same to preserve the / separator in the value
  override get rawValue() {
    return this.value
  }

  override blurError(value: string) {
    const unmasked = unmask(value)
    const expirationValid = valid.expirationDate(unmasked)
    if (!unmasked || (unmasked && unmasked.length !== 4)) {
      this.setErrorAndValidity('Your card expiration is incomplete.', 'INVALID')
    } else if (expirationValid.isValid) {
      this.setErrorAndValidity('', 'VALID')
    } else {
      this.setErrorAndValidity("Your card's expiration year is in the past.", 'INVALID')
    }
  }

  override changeError(value: string) {
    const unmasked = this.unmask(value)
    const expirationValid = valid.expirationDate(unmasked)
    if (expirationValid.isPotentiallyValid) {
      this.setErrorAndValidity('', 'VALID')
    } else if (expirationValid.isValid) {
      this.setErrorAndValidity('', 'VALID')
    } else {
      this.setErrorAndValidity("Your card's expiration year is in the past.", 'INVALID')
    }
  }

  override mask(value: string) {
    if (/^[2-9]/.test(unmask(value))) {
      return this.makeMask(' / ', 2)(`0${value}`)
    }
    return this.makeMask(' / ', 2)(value)
  }

  private makeMask(separator: string, limit: number) {
    return (value: string) => {
      const output: string[] = []
      // eslint-disable-next-line unicorn/no-for-loop
      for (let i = 0; i < value.length; i++) {
        if (i !== 0 && i % limit === 0) {
          output.push(separator)
        }

        output.push(value[i])
      }

      return output.join('')
    }
  }
}
