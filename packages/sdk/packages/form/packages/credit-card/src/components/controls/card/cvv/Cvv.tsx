import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardCvvFormControl } from './use.js'

export const CreditCardCvvWithFormControl: React.FC<WithFormControlProps> = ({ formControlName = 'cvc', fieldLabel = 'CVC', ...props }) => {
  const { creditCardCvvFormControl, error, inputRef, value } = useCreditCardCvvFormControl(formControlName)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardCvvFormControl?.props ?? {}

  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardCvvFormControl}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{ 'aria-label': `${fieldLabel} number on the back of your card`, autoComplete, autoCorrect, id, name, spellCheck }}
      inputRef={inputRef}
      value={value}
      {...cvcProps}
      {...props}
    />
  )
}
