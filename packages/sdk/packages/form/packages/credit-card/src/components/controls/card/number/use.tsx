import { StandardTextFieldProps } from '@mui/material'
import { FormControlBase } from '@xyo-network/react-form-group'
import { useEffect, useState } from 'react'

import { CreditCardNumberFormControl } from '../../../../controls/index.js'
import { CreditCardOptions } from '../Options.js'
import { useCreditCardFormControl } from '../useCreditCardFormControl.js'

export const useCreditCardNumberFormControl = (formControlName?: string, control?: new () => FormControlBase<StandardTextFieldProps>) => {
  const { creditCardFormControl, error, inputRef, value } = useCreditCardFormControl(formControlName, control)
  const [type, setType] = useState('' as keyof CreditCardOptions)

  useEffect(() => {
    if (creditCardFormControl) {
      const castInstance = creditCardFormControl as CreditCardNumberFormControl<StandardTextFieldProps>
      if (!castInstance.onCreditCardTypeChange) {
        console.error('cannot set onCreditCardTypeChange on control because it is not a CreditCardNumberFormControl')
        return
      }
      castInstance.onCreditCardTypeChange = (type: string) => setType(type as keyof CreditCardOptions)
    }
  }, [creditCardFormControl, inputRef])

  return { creditCardFormControl, error, inputRef, type, value }
}
