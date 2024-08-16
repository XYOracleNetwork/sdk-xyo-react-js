import { Typography } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

export const FooterLinks: React.FC<FlexBoxProps> = ({ children, title, ...props }) => {
  return (
    <FlexCol margin={1} justifyContent="flex-start" title={title} {...props}>
      <Typography margin={0.5} variant="h6" noWrap>
        {title}
      </Typography>
      {children}
    </FlexCol>
  )
}
