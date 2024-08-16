import React from 'react'

import { CreditCardZipFormControl } from '../../../controls/index.ts'
import type { WithFormControlProps } from '../WithFormControlProps.ts'
import { FormControlTextField } from './FormControlTextField.tsx'
import { useCreditCardFormControl } from './useCreditCardFormControl.tsx'

export const CreditCardZipWithFormControl: React.FC<WithFormControlProps> = ({ formControlName = 'zip', fieldLabel = 'Zip', ...props }) => {
  const { creditCardFormControl, error, inputRef, value } = useCreditCardFormControl(formControlName, CreditCardZipFormControl)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cvcProps } = creditCardFormControl?.props ?? {}

  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardFormControl}
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
