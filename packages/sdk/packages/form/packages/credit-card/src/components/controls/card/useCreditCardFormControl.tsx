import type { StandardTextFieldProps } from '@mui/material'
import type { FormControlBase, ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../context/index.ts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StableDefaultArgs: any[] = []

export const useCreditCardFormControl = (
  formControlName?: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Control?: new (...args: any[]) => FormControlBase<StandardTextFieldProps>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  args: any[] = StableDefaultArgs,
) => {
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardFormControl = useMemo(() => {
    if (Control) {
      const control = new Control(...args)
      control.registerOnErrorChange((newError: string) => setError(newError))
      control.registerOnChange((value: ValidControlValue) => setValue(value))

      if (formControlName) formGroup?.registerControl(formControlName, control)
      return control
    }
  }, [Control, args, formControlName, formGroup])

  return { creditCardFormControl, error, inputRef, value }
}
