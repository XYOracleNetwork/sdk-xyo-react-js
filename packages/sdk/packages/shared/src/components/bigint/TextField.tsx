import type { FormControlProps, StandardTextFieldProps } from '@mui/material'
import {
  FormControl, FormHelperText, TextField,
} from '@mui/material'
import type { ChangeEventHandler } from 'react'
import React from 'react'

export interface BigIntTextFieldProps extends StandardTextFieldProps {
  helperText?: string
  hideHelperText?: boolean
  onChangeBigInt?: (value: bigint) => void
}

export const BigIntTextField: React.FC<BigIntTextFieldProps> = ({
  helperText, hideHelperText, onChangeBigInt, onChange, ...props
}) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // callback for string value
    onChange?.(event)

    // callback for bigint value
    const value = event.target.value
    onChangeBigInt?.(BigInt(value))
  }

  return (
    <>
      <TextField onChange={handleChange} type="string" {...props} />
      {hideHelperText ? null : <FormHelperText>{helperText ?? 'Enter a base 10 number'}</FormHelperText>}
    </>
  )
}

export interface WithFormControlProps extends FormControlProps {
  textFieldProps?: BigIntTextFieldProps
}

export const WithFormControl: React.FC<WithFormControlProps> = ({ textFieldProps, ...props }) => (
  <FormControl {...props}>
    <BigIntTextField {...textFieldProps} />
  </FormControl>
)
