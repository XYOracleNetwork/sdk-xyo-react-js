import type { StackProps } from '@mui/material'
import { Stack, Typography } from '@mui/material'
import React from 'react'

export interface LabeledTextFieldWrapperProps extends StackProps {
  label: string
}

export const LabeledTextFieldWrapper: React.FC<LabeledTextFieldWrapperProps> = ({ children, label, ...props }) => {
  return (
    <Stack flexDirection="column" {...props}>
      <Typography gutterBottom variant="caption">
        {label}
      </Typography>
      {children}
    </Stack>
  )
}
