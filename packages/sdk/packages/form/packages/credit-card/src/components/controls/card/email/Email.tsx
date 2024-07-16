import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardEmailFormControl } from './use.js'

export const CreditCardEmailWithFormControl: React.FC<WithFormControlProps> = ({ formControlName = 'email', fieldLabel = 'Email', ...props }) => {
  const { creditCardEmailFormControl, error, inputRef, value } = useCreditCardEmailFormControl(formControlName)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardEmailFormControl?.props ?? {}

  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardEmailFormControl}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{ 'aria-label': `${fieldLabel} code for your card`, autoComplete, autoCorrect, id, name, spellCheck }}
      inputRef={inputRef}
      value={value}
      {...cvcProps}
      {...props}
    />
  )
}
