import React from 'react'

import { CreditCardExpirationFormControl } from '../../../controls/index.ts'
import type { WithFormControlProps } from '../WithFormControlProps.ts'
import { FormControlTextField } from './FormControlTextField.tsx'
import { useCreditCardFormControl } from './useCreditCardFormControl.tsx'

export const CreditCardExpirationWithFormControl: React.FC<WithFormControlProps> = ({
  formControlName = 'expiration',
  fieldLabel = 'Expiration',
  ...props
}) => {
  const {
    creditCardFormControl, error, inputRef, value,
  } = useCreditCardFormControl(formControlName, CreditCardExpirationFormControl)
  const {
    autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...expirationProps
  } = creditCardFormControl?.props ?? {}

  return (
    <FormControlTextField
      inputRef={inputRef}
      formControl={creditCardFormControl}
      fieldLabel={fieldLabel}
      formControlError={error}
      inputMode={inputMode}
      slotProps={{
        htmlInput: {
          'aria-label': `${fieldLabel} of the card`, autoComplete, autoCorrect, id, name, spellCheck,
        },
      }}
      value={value}
      {...expirationProps}
      {...props}
    />
  )
}
