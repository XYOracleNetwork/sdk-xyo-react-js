import type { EmptyObject } from '@xylabs/object'
import { FormControlBase } from '@xyo-network/react-form-group'

const CONTROL_NAME = 'Email'

export class CreditCardEmailFormControl<TProps extends EmptyObject = EmptyObject> extends FormControlBase<TProps> {
  override invalidMessage = 'Your email is invalid.'

  override pattern = /^.*$/
  override patternStrict = /^([\w+.\-])+@(([\dA-Za-z-])+\.)+([\dA-Za-z]{2,4})+$/

  override props = {
    autoComplete: 'email',
    autoCorrect: 'off',
    id: CONTROL_NAME.toLocaleLowerCase(),
    name: CONTROL_NAME.toLocaleLowerCase(),
    placeholder: 'jerry.smith@email.com',
    spellCheck: false,
  } as TProps

  override required = true

  constructor() {
    super()
    super.setName(CONTROL_NAME)
    this.setSerializeSettings({ sensitive: false, serializable: true })
  }

  override blurError(value: string) {
    const match = value.match(this.patternStrict)
    this.updateValidation(match)
  }

  override changeError(value: string) {
    if (this.error) {
      this.blurError(value)
    }
  }

  private updateValidation(match: RegExpMatchArray | null) {
    if (match) {
      this.setErrorAndValidity('', 'VALID')
    } else {
      this.setErrorAndValidity(this.invalidMessage, 'INVALID')
    }
  }
}
