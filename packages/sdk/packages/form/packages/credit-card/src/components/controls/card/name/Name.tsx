import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardNameFormControl } from './use.js'

export interface NameWithFormControlProps extends WithFormControlProps {
  autoCompleteLabel: string
}

export const NameWithFormControl: React.FC<NameWithFormControlProps> = ({
  autoCompleteLabel,
  fieldLabel,
  formControlName,
  placeholder,
  tabIndex,
  ...props
}) => {
  const { creditCardNameFormControl, error, inputRef, value } = useCreditCardNameFormControl(
    formControlName,
    (fieldLabel = 'Name'),
    autoCompleteLabel,
    placeholder,
  )
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardNameFormControl?.props ?? {}
  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardNameFormControl}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{ 'aria-label': `${fieldLabel} name on your card`, autoComplete, autoCorrect, id, name, spellCheck, tabIndex }}
      inputRef={inputRef}
      value={value}
      {...cvcProps}
      {...props}
    />
  )
}
