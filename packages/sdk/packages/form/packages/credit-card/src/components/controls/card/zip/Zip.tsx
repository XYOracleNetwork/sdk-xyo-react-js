import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardZipFormControl } from './use.js'

export const CreditCardZipWithFormControl: React.FC<WithFormControlProps> = ({ formControlName = 'zip', fieldLabel = 'Zip', ...props }) => {
  const { creditCardZipFormControl, error, inputRef, value } = useCreditCardZipFormControl(formControlName)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardZipFormControl?.props ?? {}

  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardZipFormControl}
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
