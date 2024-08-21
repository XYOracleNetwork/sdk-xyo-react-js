import type { AlertProps } from '@mui/material'
import { Alert } from '@mui/material'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'

import { useValidatePayload } from '../../contexts/index.ts'

export const ValidatePayloadAlert: React.FC<WithChildren<AlertProps>> = ({
  children, ...props
}) => {
  const {
    validPayload, enabled, schema,
  } = useValidatePayload()

  if (enabled && validPayload === false) {
    return (
      <Alert severity="error" title="Invalid Payload!" {...props}>
        Payload schema claimed to be
        {' '}
        {schema}
        {' '}
        but failed to validate.
      </Alert>
    )
  }

  return <>{children}</>
}
