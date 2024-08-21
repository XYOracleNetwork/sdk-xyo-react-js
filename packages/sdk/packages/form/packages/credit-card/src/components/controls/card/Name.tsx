import React, { useMemo } from 'react'

import { NameFormControl } from '../../../controls/index.ts'
import type { WithFormControlProps } from '../WithFormControlProps.ts'
import { FormControlTextField } from './FormControlTextField.tsx'
import { useCreditCardFormControl } from './useCreditCardFormControl.tsx'

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
  const args = useMemo(() => [fieldLabel, autoCompleteLabel, placeholder ?? ''], [autoCompleteLabel, fieldLabel, placeholder])
  const {
    creditCardFormControl, error, inputRef, value,
  } = useCreditCardFormControl(formControlName, NameFormControl, args)
  const {
    autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps
  } = creditCardFormControl?.props ?? {}
  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardFormControl}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{
        'aria-label': `${fieldLabel} name on your card`, autoComplete, autoCorrect, id, name, spellCheck, tabIndex,
      }}
      inputRef={inputRef}
      value={value}
      {...cvcProps}
      {...props}
    />
  )
}
