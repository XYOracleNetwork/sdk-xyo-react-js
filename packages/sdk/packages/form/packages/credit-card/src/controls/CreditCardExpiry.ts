import { assertEx } from '@xylabs/assert'
import { EmptyObject } from '@xylabs/object'
import { AbstractControl, FormControlBase } from '@xyo-network/react-form-group'
import valid from 'card-validator'

import { unmask } from '../utils/index.js'

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

  override blurError(value: string) {
    const unmasked = unmask(value)
    const expirationValid = valid.expirationDate(unmasked)
    if (!unmasked || (unmasked && unmasked.length !== 4)) {
      this.setError('Your card expiration is incomplete.')
      this.setStatus('INVALID')
    } else if (expirationValid.isValid) {
      this.setError('')
      this.setStatus('VALID')
    } else {
      this.setError("Your card's expiration year is in the past.")
      this.setStatus('INVALID')
    }
  }

  override changeError(value: string) {
    const unmasked = this.unmask(value)
    const expirationValid = valid.expirationDate(unmasked)
    if (expirationValid.isPotentiallyValid) {
      this.setError('')
      this.setStatus('VALID')
    } else if (expirationValid.isValid) {
      this.setError('')
      this.setStatus('VALID')
    } else {
      this.setError("Your card's expiration year is in the past.")
      this.setStatus('INVALID')
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