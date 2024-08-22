import type { FormControlProps } from '@mui/material'
import {
  Checkbox, FormControl, FormLabel,
} from '@mui/material'
import React from 'react'

export interface CheckboxFormControlProps extends FormControlProps {
  onCheckChanged?: (checked: boolean) => void
}

export const CheckboxFormControl: React.FC<CheckboxFormControlProps> = ({ onCheckChanged, ...props }) => {
  return (
    <FormControl {...props}>
      <FormLabel>
        <Checkbox onChange={(_, checked) => onCheckChanged?.(checked)} />
        Do not show this again.
      </FormLabel>
    </FormControl>
  )
}
