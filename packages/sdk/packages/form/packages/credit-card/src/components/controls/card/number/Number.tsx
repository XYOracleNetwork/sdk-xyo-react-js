import { InputAdornment } from '@mui/material'

import { CreditCardNumberFormControl } from '../../../../controls/index.js'
import { WithFormControlProps } from '../../WithFormControlProps.js'
import { FormControlTextField } from '../FormControlTextField.js'
import { CreditCardData } from '../Options.js'
import { useCreditCardNumberFormControl } from './use.js'

export const CreditCardNumberWithFormControl: React.FC<WithFormControlProps> = ({
  fieldLabel = 'Card Number',
  formControlName = 'cardNumber',
  ...props
}) => {
  const { creditCardFormControl, error, inputRef, type, value } = useCreditCardNumberFormControl(formControlName, CreditCardNumberFormControl)
  const { autoComplete, autoCorrect, id, inputMode, name, spellCheck, ...cardProps } = creditCardFormControl?.props ?? {}

  return (
    <FormControlTextField
      fieldLabel={fieldLabel}
      formControl={creditCardFormControl}
      formControlError={error}
      inputRef={inputRef}
      inputMode={inputMode}
      inputProps={{ 'aria-label': fieldLabel, autoComplete, autoCorrect, id, inputMode, name, spellCheck }}
      InputProps={{
        startAdornment:
          type.length > 0 ?
            <InputAdornment position="start">
              <img height={'30px'} width={'40px'} src={CreditCardData[type].icon} />
            </InputAdornment>
          : null,
      }}
      value={value}
      {...cardProps}
      {...props}
    />
  )
}