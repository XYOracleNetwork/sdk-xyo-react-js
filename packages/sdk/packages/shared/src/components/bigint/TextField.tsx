import type {
  FormControlProps, StandardTextFieldProps, TextFieldProps,
} from '@mui/material'
import {
  FormControl, FormHelperText, TextField,
} from '@mui/material'
import { toFixedPoint } from '@xylabs/decimal-precision'
import { isDefined } from '@xylabs/sdk-js'
import type { FocusEventHandler } from 'react'
import React, {
  useEffect, useMemo, useState,
} from 'react'

import { formatBigIntInput } from './helpers/index.ts'
import { FixedPointInputAdornment } from './InputAdornment.tsx'

export type BigIntTextFieldProps = TextFieldProps & {
  defaultFixedPoint?: number
  defaultRawValue?: string
  hideAdornment?: boolean
  onChangeFixedPoint?: (value?: bigint) => void
  onChangeFormatted?: (value?: string) => void
  resetValue?: number
}

export const BigIntTextField: React.FC<BigIntTextFieldProps> = ({
  defaultFixedPoint = 18, defaultRawValue, helperText, hideAdornment, onChangeFixedPoint, onChangeFormatted, onChange, resetValue, ...props
}) => {
  const [rawValue, setRawValue] = useState<string>('')
  const [fixedPoint, setFixedPoint] = useState(defaultFixedPoint)
  const [error, setError] = useState<Error>()

  useMemo(() => {
    setRawValue('')
  }, [resetValue])

  useMemo(() => {
    if (isDefined(defaultRawValue)) {
      const formattedValue = formatBigIntInput(defaultRawValue)
      if (formattedValue) setRawValue(formattedValue)
    }
  }, [defaultRawValue])

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    // run standard callback with raw event
    onChange?.(event)

    const formattedValue = formatBigIntInput(event.target.value)
    if (isDefined(formattedValue)) {
      // if value was formatted, update the state and run the formatted change callback
      setRawValue(formattedValue)
      onChangeFormatted?.(formattedValue)
    }
  }

  const onFixedPointChange = (fixedPoint: number) => setFixedPoint(fixedPoint)

  // on value or point changes, run the bigInt callback
  const bigIntValue = useMemo(() => {
    if (rawValue) {
      const fixedValue = toFixedPoint(rawValue, fixedPoint)
      setError(undefined)
      try {
        return fixedValue
      } catch (e) {
        console.error(e)
        setError(e as Error)
        return
      }
    } else {
      return
    }
    // run bigInt callback
  }, [rawValue, fixedPoint])

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
