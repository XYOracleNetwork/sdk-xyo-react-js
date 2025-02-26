import type { FormControlProps, StandardTextFieldProps } from '@mui/material'
import {
  FormControl, FormHelperText, TextField,
} from '@mui/material'
import type { FocusEventHandler } from 'react'
import React, {
  useEffect, useMemo,
  useState,
} from 'react'

import { FixedPointInputAdornment } from './InputAdornment.tsx'

export interface BigIntTextFieldProps extends StandardTextFieldProps {
  onChangeFixedPoint?: (value: bigint) => void
}

export const BigIntTextField: React.FC<BigIntTextFieldProps> = ({
  helperText, onChangeFixedPoint, onChange, ...props
}) => {
  const [value, setValue] = useState<number>(0)
  const [rawValue, setRawValue] = useState<string>('')
  const [fixedPoint, setFixedPoint] = useState(18)
  const [error, setError] = useState<Error>()

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    // run standard callback
    onChange?.(event)
    // remove all alpha characters but allow decimals
    const filteredValue = event.target.value.replaceAll(/[^\d.]/g, '')
    // only allow one decimal point
    if (filteredValue.split('.').length > 2) return
    setRawValue(filteredValue)

    // parse the raw filtered raw value
    const value = Number.parseFloat(filteredValue || '0')
    // if the value is NaN set it to 0
    if (Number.isNaN(value)) setValue(0)
    setValue(value)
  }

  const onFixedPointChange = (fixedPoint: number) => setFixedPoint(fixedPoint)

  // on value or point changes, run the bigInt callback
  const bigIntValue = useMemo(() => {
    const fixedValue = value * (10 ** fixedPoint)
    setError(undefined)
    try {
      return BigInt(fixedValue)
    } catch (e) {
      console.error(e)
      setError(e as Error)
    }
    // run bigInt callback
  }, [value, fixedPoint])

  useEffect(() => {
    if (bigIntValue) onChangeFixedPoint?.(bigIntValue)
  }, [bigIntValue])

  // prevent the fixed point from being less than the number of decimal places
  const minFixedPoint = rawValue.split('.')[1]?.length

  const resolvedHelperText = useMemo(() => {
    if (error) return 'Cannot convert to BigInt'
    return helperText ?? 'Enter a number'
  }, [helperText, error])

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
              <FixedPointInputAdornment
                position="start"
                fixedPoint={fixedPoint}
                minFixedPoint={minFixedPoint}
                onFixedPointChange={onFixedPointChange}
              />
            ),
          },
        }}
        value={rawValue}
        {...props}
      />
      <FormHelperText>{resolvedHelperText}</FormHelperText>
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
