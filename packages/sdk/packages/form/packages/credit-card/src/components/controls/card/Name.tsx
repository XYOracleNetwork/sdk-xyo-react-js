import { useMemo } from 'react'

import { NameFormControl } from '../../../controls/index.js'
import { WithFormControlProps } from '../WithFormControlProps.js'
import { FormControlTextField } from './FormControlTextField.js'
import { useCreditCardFormControl } from './useCreditCardFormControl.js'

export interface NameWithFormControlProps extends WithFormControlProps {
  autoCompleteLabel: string
}

export const NameWithFormControl: React.FC<NameWithFormControlProps> = ({
  autoCompleteLabel,
  fieldLabel = 'Name',
  formControlName,
  placeholder,
  tabIndex,
  ...props
}) => {
  const control = useMemo(() => new NameFormControl(fieldLabel, autoCompleteLabel, placeholder ?? ''), [autoCompleteLabel, fieldLabel, placeholder])
  const { creditCardFormControl, error, inputRef, value } = useCreditCardFormControl(formControlName, control)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardFormControl?.props ?? {}
  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardFormControl}
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
