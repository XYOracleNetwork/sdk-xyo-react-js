import type { StandardTextFieldProps, TextFieldProps } from '@mui/material'
import {
  alpha, TextField, useTheme,
} from '@mui/material'
import { MIN_DOMAIN_LENGTH, XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import React, {
  useLayoutEffect, useMemo, useRef, useState,
} from 'react'

export interface XnsEstimateNameTextFieldProps {
  maskOutput?: boolean
}

export const XnsEstimateNameTextField: React.FC<XnsEstimateNameTextFieldProps & TextFieldProps> = ({
  maskOutput = true, onChange: onChangeProp, onBlur: onBlurProp, value, ...props
}) => {
  const theme = useTheme()
  const [validLength, setValidLength] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  // watch for external changes to the value and update the validLength state
  useMemo(() => {
    const validValueLength = !!(value && typeof value === 'string' && value.length >= MIN_DOMAIN_LENGTH)
    setValidLength(validValueLength)
  }, [value])

  // Update the input value when the value prop changes
  // NOTE: the intent of this component is to remain uncontrolled to avoid the need to manage the value state
  // Therefore, we use useLayoutEffect to update the input value directly.
  useLayoutEffect(() => {
    if (inputRef.current && typeof value === 'string') {
      inputRef.current.value = value
    }
  }, [value])

  // override onChange to mask the input and update the event value
  const handleChange: StandardTextFieldProps['onChange'] = (event) => {
    if (maskOutput) {
      const value = event.target.value
      event.target.value = XnsNameHelper.mask(value)
    }
    onChangeProp?.(event)

    if (inputRef.current) {
      setValidLength(inputRef.current.value.length >= MIN_DOMAIN_LENGTH)
    }
  }

  // override onBlur to do a final mask of the input and update the event value
  const handleBlur: StandardTextFieldProps['onBlur'] = (event) => {
    if (maskOutput) {
      const value = event.target.value
      event.target.value = XnsNameHelper.mask(value, { maskStartEndHyphens: true })
    }
    onBlurProp?.(event)
  }

  return (
    (<TextField
      inputRef={inputRef}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
      slotProps={{
        htmlInput: { style: { color: validLength ? theme.palette.text.primary : alpha(theme.palette.text.primary, 0.5) } }
      }} />)
  );
}
