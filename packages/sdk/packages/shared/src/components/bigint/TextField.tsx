import type { FormControlProps, StandardTextFieldProps } from '@mui/material'
import {
  FormControl, FormHelperText, TextField,
} from '@mui/material'
import type { FocusEventHandler } from 'react'
import React, {
  useEffect, useMemo, useState,
} from 'react'

import { FixedPointInputAdornment } from './InputAdornment.tsx'

export interface BigIntTextFieldProps extends StandardTextFieldProps {
  defaultFixedPoint?: number
  defaultRawValue?: string
  hideAdornment?: boolean
  onChangeFixedPoint?: (value?: bigint) => void
  resetValue?: boolean
}

export const BigIntTextField: React.FC<BigIntTextFieldProps> = ({
  defaultFixedPoint = 18, defaultRawValue, helperText, hideAdornment, onChangeFixedPoint, onChange, resetValue, ...props
}) => {
  const [value, setValue] = useState<number | undefined>()
  const [rawValue, setRawValue] = useState<string>('')
  const [fixedPoint, setFixedPoint] = useState(defaultFixedPoint)
  const [error, setError] = useState<Error>()

  useMemo(() => {
    setRawValue('')
    setValue(undefined)
  }, [resetValue])

  const handleRawValueChange = (rawValue: string) => {
    // remove all alpha characters but allow decimals
    const filteredValue = rawValue.replaceAll(/[^\d.]/g, '')
    // only allow one decimal point
    if (filteredValue.split('.').length > 2) return
    setRawValue(filteredValue)

    // parse the raw filtered raw value
    const value = Number.parseFloat(filteredValue)
    // if the value is NaN set it to 0
    if (Number.isNaN(value)) setValue(undefined)
    setValue(value)
  }

  useMemo(() => {
    if (defaultRawValue) {
      handleRawValueChange(defaultRawValue)
    } else {
      setValue(undefined)
    }
  }, [defaultRawValue])

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    // run standard callback
    onChange?.(event)
    handleRawValueChange(event.target.value)
  }

  const onFixedPointChange = (fixedPoint: number) => setFixedPoint(fixedPoint)

  // on value or point changes, run the bigInt callback
  const bigIntValue = useMemo(() => {
    if (value) {
      const fixedValue = value * (10 ** fixedPoint)
      setError(undefined)
      try {
        return BigInt(fixedValue)
      } catch (e) {
        console.error(e)
        setError(e as Error)
        return
      }
    } else {
      return
    }
    // run bigInt callback
  }, [value, fixedPoint])

  useEffect(() => {
    onChangeFixedPoint?.(bigIntValue)
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
            startAdornment: (hideAdornment
              ? null
              : (
                  <FixedPointInputAdornment
                    position="start"
                    fixedPoint={fixedPoint}
                    minFixedPoint={minFixedPoint}
                    onFixedPointChange={onFixedPointChange}
                  />
                )
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

export interface InputWithFormControlProps extends FormControlProps {
  textFieldProps?: BigIntTextFieldProps
}

export const WithFormControl: React.FC<InputWithFormControlProps> = ({ textFieldProps, ...props }) => (
  <FormControl {...props}>
    <BigIntTextField {...textFieldProps} />
  </FormControl>
)
