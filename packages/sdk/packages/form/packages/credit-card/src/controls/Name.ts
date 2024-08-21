import type { EmptyObject } from '@xylabs/object'
import { FormControlBase } from '@xyo-network/react-form-group'

export class NameFormControl<TProps extends EmptyObject = EmptyObject> extends FormControlBase<TProps> {
  override required = true

  constructor(
    private nameLabel: string,
    autoCompleteLabel: string,
    placeHolder: string,
  ) {
    super()
    super.setName(nameLabel)
    this.setSerializeSettings({
      sensitive: false, serializable: true,
    })
    this.invalidMessage = `${nameLabel} name is missing.`
    this.props = {
      autoComplete: autoCompleteLabel,
      autoCorrect: 'off',
      id: this.nameLabel,
      name: this.nameLabel,
      placeholder: placeHolder,
      spellCheck: false,
    } as TProps
  }

  override blurError(value: string) {
    if (value) {
      this.setErrorAndValidity('', 'VALID')
    } else {
      this.setErrorAndValidity(this.invalidMessage, 'INVALID')
    }
  }

  override changeError(value: string): void {
    this.blurError(value)
  }
}
