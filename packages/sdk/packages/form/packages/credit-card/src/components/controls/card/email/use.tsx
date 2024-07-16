import { StandardTextFieldProps } from '@mui/material'
import { ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../../context/index.js'
import { CreditCardEmailFormControl } from '../../../../controls/index.js'

export const useCreditCardEmailFormControl = (formControlName?: string) => {
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardEmailFormControl = useMemo(() => {
    const instance = new CreditCardEmailFormControl<StandardTextFieldProps>()
    instance.registerOnErrorChange((newError: string) => setError(newError))
    instance.registerOnChange((value: ValidControlValue) => setValue(value))

    if (formControlName) formGroup?.registerControl(formControlName, instance)
    return instance
  }, [formControlName, formGroup])

  return { creditCardEmailFormControl, error, inputRef, value }
}
