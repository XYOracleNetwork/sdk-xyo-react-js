import { StandardTextFieldProps } from '@mui/material'
import { useMemo } from 'react'

import { CreditCardZipFormControl } from '../../../../controls/index.js'
import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { useCreditCardFormControl } from '../useCreditCardFormControl.js'

export const CreditCardZipWithFormControl: React.FC<WithFormControlProps> = ({ formControlName = 'zip', fieldLabel = 'Zip', ...props }) => {
  const control = useMemo(() => new CreditCardZipFormControl<StandardTextFieldProps>(), [])
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
