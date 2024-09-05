import { type StandardTextFieldProps, TextField } from '@mui/material'
import { XnsNameHelper } from '@xyo-network/xns-record-payloadset-plugins'
import React from 'react'

export interface NameEstimateTextFieldProps extends StandardTextFieldProps {
  maskOutput?: boolean
}

export const XnsNameEstimateTextField: React.FC<NameEstimateTextFieldProps> = ({ maskOutput = true, ...props }) => {
  // override onChange to mask the input and update the event value
  const handleChange: StandardTextFieldProps['onChange'] = (event) => {
    const onChangeProp = props.onChange

    if (maskOutput) {
      const value = event.target.value
      event.target.value = XnsNameHelper.mask(value)
    }
    onChangeProp?.(event)
  }

  return (
    <TextField
      // override onChange
      onChange={handleChange}
      {...props}
    />
  )
}
