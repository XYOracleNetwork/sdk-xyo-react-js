import { StandardTextFieldProps } from '@mui/material'
import { FormControlBase, ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../context/index.js'

export const useCreditCardFormControl = (formControlName?: string, control?: FormControlBase<StandardTextFieldProps>) => {
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardFormControl = useMemo(() => {
    if (control) {
      control.registerOnErrorChange((newError: string) => setError(newError))
      control.registerOnChange((value: ValidControlValue) => setValue(value))
      control.onCursorChange = (cursor: number | undefined) => {
        if (inputRef.current && cursor) {
          inputRef.current.setSelectionRange(cursor, cursor)
        }
      }

      if (formControlName) formGroup?.registerControl(formControlName, control)
      return control
    }
  }, [control, formControlName, formGroup])

  return { creditCardFormControl, error, inputRef, value }
}
