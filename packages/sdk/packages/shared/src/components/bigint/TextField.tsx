import type { FormControlProps, StandardTextFieldProps } from '@mui/material'
import {
  Avatar, FormControl, FormHelperText, IconButton, InputAdornment, TextField,
} from '@mui/material'
import type { FocusEventHandler } from 'react'
import React, {
  useMemo, useRef, useState,
} from 'react'

import { FixedPointPopover } from './FixedPointPopover.tsx'

export interface BigIntTextFieldProps extends StandardTextFieldProps {
  onChangeBigInt?: (value: bigint) => void
}

export const BigIntTextField: React.FC<BigIntTextFieldProps> = ({
  helperText, onChangeBigInt, onChange, ...props
}) => {
  const [value, setValue] = useState<number>(0)
  const [rawValue, setRawValue] = useState<string>('')
  const [fixedPoint, setFixedPoint] = useState(18)
  const [error, setError] = useState<Error>()
  const ref = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    // run standard callback
    onChange?.(event)
    // remove all alpha characters but allow decimals
    const filteredValue = event.target.value.replaceAll(/[^\d.]/g, '')
    if (filteredValue.split('.').length > 2) return
    setRawValue(filteredValue)

    const value = Number.parseFloat(filteredValue || '0')
    if (Number.isNaN(value)) setValue(0)
    setValue(value)
  }

  const onFixedPointChange = (fixedPoint: number) => setFixedPoint(fixedPoint)

  useMemo(() => {
    const fixedValue = value * (10 ** fixedPoint)
    setError(undefined)
    try {
      const bigInitValue = BigInt(fixedValue)
      onChangeBigInt?.(bigInitValue)
    } catch (e) {
      setError(e as Error)
    }
    // run bigInt callback
  }, [value, fixedPoint])

  return (
    <>
      <TextField
        onChange={handleChange}
        type="string"
        error={Boolean(error)}
        slotProps={{
          htmlInput: { pattern: '[0-9]*[.]?[0-9]*' },
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FixedPointPopover
                  anchorEl={ref.current}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  fixedPoint={fixedPoint}
                  onClose={() => setOpen(false)}
                  onFixedPointChange={onFixedPointChange}
                  open={open}
                />
                <IconButton size="small" ref={ref} onClick={() => setOpen(!open)}>
                  <Avatar sx={{
                    fontSize: '.75rem',
                    height: '20px',
                    width: '20px',
                  }}
                  >
                    {fixedPoint}
                  </Avatar>
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        value={rawValue}
        {...props}
      />
      <FormHelperText>{helperText ?? 'Enter a number'}</FormHelperText>
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
