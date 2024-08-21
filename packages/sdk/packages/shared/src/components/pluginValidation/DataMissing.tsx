import type { AlertProps } from '@mui/material'
import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export interface PayloadDataMissingProps extends AlertProps {
  alertBody?: string
}

export const PayloadDataMissing: React.FC<PayloadDataMissingProps> = ({
  alertBody, ...props
}) => {
  return (
    <Alert severity="warning" {...props}>
      <AlertTitle>Missing Data</AlertTitle>
      {alertBody ?? 'Payload is missing required data to render correctly'}
    </Alert>
  )
}
