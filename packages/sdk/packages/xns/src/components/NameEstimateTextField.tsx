import { type StandardTextFieldProps, TextField } from '@mui/material'
import React from 'react'

export interface EstimateTextFieldProps extends StandardTextFieldProps {
  maskOutput: boolean
}

export const XnsNameEstimateTextField: React.FC<EstimateTextFieldProps> = ({ maskOutput, ...props }) => {
  // const handleChange = (event) => {
  //   const onChangeProp = props.onChange
  // }
  return <TextField {...props} />
}
