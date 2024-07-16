import { StandardTextFieldProps } from '@mui/material'
import { useMemo } from 'react'

import { CreditCardExpirationFormControl } from '../../../controls/index.js'
import { WithFormControlProps } from '../WithFormControlProps.js'
import { FormControlTextField } from './FormControlTextField.js'
import { useCreditCardFormControl } from './useCreditCardFormControl.js'

export const CreditCardExpirationWithFormControl: React.FC<WithFormControlProps> = ({
  formControlName = 'expiration',
  fieldLabel = 'Expiration',
  ...props
}) => {
  const control = useMemo(() => new CreditCardExpirationFormControl<StandardTextFieldProps>(), [])
  const { creditCardFormControl, error, inputRef, value } = useCreditCardFormControl(formControlName, control)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...expirationProps } = creditCardFormControl?.props ?? {}

  return (
    <FormControlTextField
      inputRef={inputRef}
      formControl={creditCardFormControl}
      fieldLabel={fieldLabel}
      formControlError={error}
      inputMode={inputMode}
      inputProps={{ 'aria-label': `${fieldLabel} of the card`, autoComplete, autoCorrect, id, name, spellCheck }}
      value={value}
      {...expirationProps}
      {...props}
    />
  )
}
