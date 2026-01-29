import type { EmptyObject } from '@xylabs/sdk-js'
import { assertEx } from '@xylabs/sdk-js'
import type { AbstractControl } from '@xyo-network/react-form-group'
import { FormControlBase } from '@xyo-network/react-form-group'
import valid from 'card-validator'

import { unmask } from '../utils/index.ts'

const CONTROL_NAME = 'cvv'

export class CreditCardCvvFormControl<TProps extends EmptyObject = EmptyObject> extends FormControlBase<TProps> {
  override invalidMessage = 'Your card cvc is invalid.'

  override pattern = /^\d{0,4}$/
  override patternStrict = /^\d{1,4}$/

  override props = {
    autoComplete: 'cc-csc',
    autoCorrect: 'off',
    id: CONTROL_NAME,
    inputMode: 'numeric',
    name: CONTROL_NAME,
    placeholder: 'CVC',
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
    const num = this.cardNumberFormControl.value
    const max = this.getCardNumberCvcMax(num)
    const cvvValidation = valid.cvv(value, max)
    if (cvvValidation.isValid) {
      this.setError('')
      this.setStatus('VALID')
    } else {
      this.setError(this.invalidMessage)
      this.setStatus('INVALID')
    }
  }

  override changeError(value: string) {
    const unmasked = this.unmask(value)
    const match = RegExp(this.patternStrict).exec(unmasked)
    if (match) {
      const num = this.cardNumberFormControl.value
      const max = this.getCardNumberCvcMax(num)
      const cvvValidation = valid.cvv(value, max)
      if (cvvValidation.isPotentiallyValid) {
        this.setError('')
        this.setStatus('VALID')
      } else {
        this.setError('Your card cvc is invalid.')
        this.setStatus('INVALID')
      }
    } else {
      this.setError(this.invalidMessage)
      this.setStatus('INVALID')
    }
  }

  setCardNumberFormControl(cardNumberFormControl: AbstractControl) {
    this._cardNumberFormControl = cardNumberFormControl
  }

  private getCardNumberCvcMax(num?: string) {
    if (!num) return 3
    const numberValidation = valid.number(num)
    return numberValidation.card ? numberValidation.card.code.size : 3
  }
}
