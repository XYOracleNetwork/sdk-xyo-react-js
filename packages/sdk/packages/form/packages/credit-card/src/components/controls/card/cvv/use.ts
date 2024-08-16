import type { StandardTextFieldProps } from '@mui/material'
import type { FormControlBase } from '@xyo-network/react-form-group'
import { useEffect } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../../context/index.ts'
import type { CreditCardCvvFormControl } from '../../../../controls/index.ts'
import { useCreditCardFormControl } from '../useCreditCardFormControl.tsx'

export const useCreditCardCvvFormControl = (
  formControlName?: string,
  cardNumberControlName = 'cardNumber',
  control?: new () => FormControlBase<StandardTextFieldProps>,
) => {
  const { creditCardFormControl, error, value, inputRef } = useCreditCardFormControl(formControlName, control)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardNumberFormControl = formGroup?.getControl?.(cardNumberControlName)

  useEffect(() => {
    if (creditCardNumberFormControl) {
      const castControl = creditCardFormControl as CreditCardCvvFormControl
      if (!castControl.setCardNumberFormControl) {
        console.error('cannot setCardNumberFormControl on control because it is not a CreditCardCvvFormControl')
        return
      }
      castControl.setCardNumberFormControl(creditCardNumberFormControl)
    }
  }, [creditCardFormControl, creditCardNumberFormControl])

  return { creditCardFormControl, error, inputRef, value }
}
