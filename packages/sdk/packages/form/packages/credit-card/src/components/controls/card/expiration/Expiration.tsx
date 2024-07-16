import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardExpirationFormControl } from './use.js'

export const CreditCardExpirationWithFormControl: React.FC<WithFormControlProps> = ({
  formControlName = 'expiration',
  fieldLabel = 'Expiration',
  ...props
}) => {
  const { creditCardExpirationFormControl, error, inputRef, value } = useCreditCardExpirationFormControl(formControlName)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...expirationProps } = creditCardExpirationFormControl?.props ?? {}

  return (
    <FormControlTextField
      inputRef={inputRef}
      formControl={creditCardExpirationFormControl}
      fieldLabel={fieldLabel}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{ 'aria-label': `${fieldLabel} of the card`, autoComplete, autoCorrect, id, name, spellCheck }}
      value={value}
      {...expirationProps}
      {...props}
    />
  )
}
