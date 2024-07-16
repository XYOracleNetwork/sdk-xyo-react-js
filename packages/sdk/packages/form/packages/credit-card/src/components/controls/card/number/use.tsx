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
      const castControl = creditCardFormControl as CreditCardNumberFormControl<StandardTextFieldProps>
      if (!castControl.onCreditCardTypeChange) {
        console.error('cannot set onCreditCardTypeChange on control because it is not a CreditCardNumberFormControl')
        return
      }
      castControl.onCreditCardTypeChange = (type: string) => setType(type as keyof CreditCardOptions)
      castControl.onCursorChange = (cursor: number | undefined) => {
        if (inputRef.current && cursor) {
          inputRef.current.setSelectionRange(cursor, cursor)
        }
      }
    }
  }, [creditCardFormControl, inputRef])

  return { creditCardFormControl, error, inputRef, type, value }
}
