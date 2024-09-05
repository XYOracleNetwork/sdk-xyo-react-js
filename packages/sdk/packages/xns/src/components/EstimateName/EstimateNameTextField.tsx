import type { StandardTextFieldProps, TextFieldProps } from '@mui/material'
import {
  alpha, TextField, useTheme,
} from '@mui/material'
import { MIN_DOMAIN_LENGTH, XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import React, { useState } from 'react'

export interface XnsEstimateNameTextFieldProps {
  maskOutput?: boolean
}

export const XnsEstimateNameTextField: React.FC<XnsEstimateNameTextFieldProps & TextFieldProps> = ({ maskOutput = true, ...props }) => {
  const theme = useTheme()
  const [validLength, setValidLength] = useState(false)

  const inputRef = React.useRef<HTMLInputElement>(null)

  // override onChange to mask the input and update the event value
  const handleChange: StandardTextFieldProps['onChange'] = (event) => {
    const onChangeProp = props.onChange

    if (maskOutput) {
      const value = event.target.value
      event.target.value = XnsNameHelper.mask(value)
    }
    onChangeProp?.(event)

    if (inputRef.current) {
      setValidLength(inputRef.current.value.length >= MIN_DOMAIN_LENGTH)
    }
  }

  const handleBlur: StandardTextFieldProps['onBlur'] = (event) => {
    const onBlurProp = props.onBlur

    if (maskOutput) {
      const value = event.target.value
      event.target.value = XnsNameHelper.mask(value, { maskStartEndHyphens: true })
    }
    onBlurProp?.(event)
  }

  return (
    <TextField
      inputProps={{ style: { color: validLength ? theme.palette.text.primary : alpha(theme.palette.text.primary, 0.5) } }}
      inputRef={inputRef}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
    />
  )
}
