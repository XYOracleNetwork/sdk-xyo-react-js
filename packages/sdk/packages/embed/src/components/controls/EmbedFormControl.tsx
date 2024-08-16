import type { FormControlProps } from '@mui/material'
import { FormControl, InputLabel } from '@mui/material'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'

interface EmbedFormControlProps extends FormControlProps {
  formId?: string
  formLabel?: string
}

export const EmbedFormControl: React.FC<WithChildren<EmbedFormControlProps>> = ({ formId, formLabel, children, ...props }) => {
  return (
    <FormControl {...props}>
      <InputLabel id={formId}>{formLabel}</InputLabel>
      {children}
    </FormControl>
  )
}
