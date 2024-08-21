import React from 'react'

import { CreditCardCvvFormControl } from '../../../../controls/index.ts'
import type { WithFormControlProps } from '../../WithFormControlProps.ts'
import { FormControlTextField } from '../FormControlTextField.tsx'
import { useCreditCardCvvFormControl } from './use.ts'

export const CreditCardCvvWithFormControl: React.FC<WithFormControlProps> = ({
  formControlName = 'cvc', fieldLabel = 'CVC', ...props
}) => {
  const {
    creditCardFormControl, error, inputRef, value,
  } = useCreditCardCvvFormControl(formControlName, undefined, CreditCardCvvFormControl)
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
        'aria-label': `${fieldLabel} number on the back of your card`, autoComplete, autoCorrect, id, name, spellCheck,
      }}
      inputRef={inputRef}
      value={value}
      {...cvcProps}
      {...props}
    />
  )
}
