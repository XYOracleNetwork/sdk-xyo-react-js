import { StandardTextFieldProps } from '@mui/material'
import { ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../../context/index.js'
import { CreditCardCvvFormControl } from '../../../../controls/index.js'

export const useCreditCardCvvFormControl = (formControlName?: string, cardNumberControlName = 'cardNumber') => {
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardNumberFormControl = formGroup?.getControl?.(cardNumberControlName)

  const creditCardCvvFormControl = useMemo(() => {
    if (creditCardNumberFormControl) {
      const instance = new CreditCardCvvFormControl<StandardTextFieldProps>()
      instance.setCardNumberFormControl(creditCardNumberFormControl)
      instance.registerOnErrorChange((newError: string) => setError(newError))
      instance.registerOnChange((value: ValidControlValue) => setValue(value))

      if (formControlName) formGroup?.registerControl?.(formControlName, instance)
      return instance
    }
  }, [creditCardNumberFormControl, formControlName, formGroup])

  return { creditCardCvvFormControl, error, inputRef, value }
}
