import { StandardTextFieldProps } from '@mui/material'
import { useMemo } from 'react'

import { CreditCardEmailFormControl } from '../../../../controls/Email.js'
import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardFormControl } from '../useCreditCardFormControl.js'

export const CreditCardEmailWithFormControl: React.FC<WithFormControlProps> = ({ formControlName = 'email', fieldLabel = 'Email', ...props }) => {
  const control = useMemo(() => new CreditCardEmailFormControl<StandardTextFieldProps>(), [])
  const { creditCardFormControl, error, inputRef, value } = useCreditCardFormControl(formControlName, control)
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
