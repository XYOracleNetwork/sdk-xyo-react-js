import { StandardTextFieldProps } from '@mui/material'
import { ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../../context/index.js'
import { CreditCardZipFormControl } from '../../../../controls/index.js'

export const useCreditCardZipFormControl = (formControlName?: string) => {
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardZipFormControl = useMemo(() => {
    const instance = new CreditCardZipFormControl<StandardTextFieldProps>()
    instance.registerOnErrorChange((newError: string) => setError(newError))
    instance.registerOnChange((value: ValidControlValue) => setValue(value))
    instance.onCursorChange = (cursor: number | undefined) => {
      if (inputRef.current && cursor) {
        inputRef.current.setSelectionRange(cursor, cursor)
      }
    }

    if (formControlName) formGroup?.registerControl?.(formControlName, instance)
    return instance
  }, [formControlName, formGroup])

  return { creditCardZipFormControl, error, inputRef, value }
}
