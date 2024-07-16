import { StandardTextFieldProps } from '@mui/material'
import { ValidControlValue } from '@xyo-network/react-form-group'
import { useMemo, useRef, useState } from 'react'

import { useFormGroupWithCreditCardInput } from '../../../../context/index.js'
import { NameFormControl } from '../../../../controls/index.js'

export const useCreditCardNameFormControl = (
  formControlName?: string,
  nameLabel: string = 'Name',
  autoCompleteLabel?: string,
  placeHolder?: string,
) => {
  const [error, setError] = useState('')
  const [value, setValue] = useState<ValidControlValue>('')
  const inputRef = useRef<HTMLInputElement>(null)

  // only use FormGroupContext when name is passed
  const { formGroup } = useFormGroupWithCreditCardInput(!!formControlName)

  const creditCardNameFormControl = useMemo(() => {
    if (formControlName) {
      const instance = new NameFormControl<StandardTextFieldProps>(nameLabel, autoCompleteLabel ?? '', placeHolder ?? '')
      instance.registerOnErrorChange((newError: string) => setError(newError))
      instance.registerOnChange((value: ValidControlValue) => setValue(value))

      if (formControlName) formGroup?.registerControl?.(formControlName, instance)
      return instance
    }
  }, [autoCompleteLabel, formControlName, nameLabel, placeHolder, formGroup])

  return { creditCardNameFormControl, error, inputRef, value }
}
