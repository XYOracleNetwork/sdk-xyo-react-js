import React from 'react'

import { CreditCardEmailFormControl } from '../../../controls/index.ts'
import type { WithFormControlProps } from '../WithFormControlProps.ts'
import { FormControlTextField } from './FormControlTextField.tsx'
import { useCreditCardFormControl } from './useCreditCardFormControl.tsx'

export const CreditCardEmailWithFormControl: React.FC<WithFormControlProps> = ({
  formControlName = 'emailAddress',
  fieldLabel = 'Email',
  ...props
}) => {
  const { creditCardFormControl, error, inputRef, value } = useCreditCardFormControl(formControlName, CreditCardEmailFormControl)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardFormControl?.props ?? {}

  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardFormControl}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{ 'aria-label': `${fieldLabel} for your purchase`, autoComplete, autoCorrect, id, name, spellCheck }}
      inputRef={inputRef}
      value={value}
      {...cvcProps}
      {...props}
    />
  )
}
