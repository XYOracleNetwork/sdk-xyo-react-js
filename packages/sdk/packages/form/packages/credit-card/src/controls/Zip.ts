import type { EmptyObject } from '@xylabs/sdk-js'
import { FormControlBase } from '@xyo-network/react-form-group'
import valid from 'card-validator'

import { unmask } from '../utils/index.ts'

const CONTROL_NAME = 'Zip'

export class CreditCardZipFormControl<TProps extends EmptyObject = EmptyObject> extends FormControlBase<TProps> {
  override invalidMessage = 'Your zip code is invalid.'

  override props = {
    autoComplete: 'postal-code',
    autoCorrect: 'off',
    id: CONTROL_NAME.toLocaleLowerCase(),
    name: CONTROL_NAME.toLocaleLowerCase(),
    placeholder: '12345',
    spellCheck: false,
  } as TProps

  override required = true

  override unmask = unmask

  constructor() {
    super()
    super.setName(CONTROL_NAME)
    this.setSerializeSettings({ sensitive: true, serializable: true })
  }

  override blurError(value: string) {
    const postalCodeValidation = valid.postalCode(value)
    if (postalCodeValidation.isValid) {
      this.setErrorAndValidity('', 'VALID')
    } else {
      this.setErrorAndValidity(this.invalidMessage, 'INVALID')
    }
  }

  override changeError(value: string) {
    const unmasked = this.unmask(value)
    const match = RegExp(this.patternStrict).exec(unmasked)
    if (match) {
      const postalCodeValidation = valid.postalCode(value)
      if (postalCodeValidation.isPotentiallyValid) {
        this.setErrorAndValidity('', 'VALID')
      } else {
        this.setErrorAndValidity('Your zip code is invalid.', 'INVALID')
      }
    } else {
      this.setErrorAndValidity(this.invalidMessage, 'INVALID')
    }
  }
}
