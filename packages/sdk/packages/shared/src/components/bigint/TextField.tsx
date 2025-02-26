import type { FormControlProps, StandardTextFieldProps } from '@mui/material'
import {
  Avatar,
  FormControl, FormHelperText, Icon, InputAdornment, TextField,
} from '@mui/material'
import type { ChangeEventHandler } from 'react'
import React, { useState } from 'react'

export interface BigIntTextFieldProps extends StandardTextFieldProps {
  onChangeBigInt?: (value: bigint) => void
}

export const BigIntTextField: React.FC<BigIntTextFieldProps> = ({
  helperText, onChangeBigInt, onChange, ...props
}) => {
  const [normalizedFactor, setNormalizedFactor] = useState(18)
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // callback for string value
    onChange?.(event)

    // callback for bigint value
    const value = Number.parseFloat(event.target.value)
    const normalizedValue = value * 10 ** normalizedFactor
    onChangeBigInt?.(BigInt(normalizedValue))
  }

  const handleNormalizedChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target
    setNormalizedFactor(Number.parseInt(value, 10))
  }

  return (
    <>
      <TextField
        onChange={handleChange}
        type="number"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Icon fontSize="small">
                  <Avatar sx={{
                    fontSize: '.75rem',
                    height: '20px',
                    width: '20px',
                  }}
                  >
                    {normalizedFactor}
                  </Avatar>
                </Icon>
              </InputAdornment>
            ),
          },
        }}
        {...props}
      />
      <FormHelperText>{helperText ?? 'Enter a number'}</FormHelperText>
      <TextField value={normalizedFactor} onChange={handleNormalizedChange} type="number" {...props} />
      <FormHelperText>{helperText ?? 'Set the shift factor'}</FormHelperText>
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
