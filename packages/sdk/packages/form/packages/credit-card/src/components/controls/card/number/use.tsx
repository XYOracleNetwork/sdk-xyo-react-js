import { StandardTextFieldProps } from '@mui/material'
import { ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../../context/index.js'
import { CreditCardNumberFormControl } from '../../../../controls/index.js'
import { CreditCardOptions } from '../Options.js'

export const useCreditCardNumberFormControl = (formControlName?: string) => {
  const [type, setType] = useState('' as keyof CreditCardOptions)
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardNumberFormControl = useMemo(() => {
    const instance = new CreditCardNumberFormControl<StandardTextFieldProps>()
    instance.registerOnErrorChange((newError: string) => setError(newError))
    instance.registerOnChange((value: ValidControlValue) => setValue(value))
    instance.onCreditCardTypeChange = (type: string) => setType(type as keyof CreditCardOptions)
    instance.onCursorChange = (cursor: number | undefined) => {
      if (inputRef.current && cursor) {
        inputRef.current.setSelectionRange(cursor, cursor)
      }
    }

    if (formControlName) formGroup?.registerControl?.(formControlName, instance)
    return instance
  }, [formControlName, formGroup])

  return { creditCardNumberFormControl, error, inputRef, type, value }
}
