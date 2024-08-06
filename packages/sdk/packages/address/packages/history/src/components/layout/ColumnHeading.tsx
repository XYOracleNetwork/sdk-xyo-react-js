import { styled } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { TypographyEx, TypographyExProps } from '@xyo-network/react-shared'
import React from 'react'

export const ColumnHeadingTypography: React.FC<WithChildren<TypographyExProps>> = ({ children, ...props }) => {
  return <StyledColumnHeadingTypography {...props}>{children}</StyledColumnHeadingTypography>
}

const StyledColumnHeadingTypography = styled(TypographyEx, { name: 'styledColumnHeadingTypography' })(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 200,
  paddingBottom: theme.spacing(1),
  textTransform: 'uppercase',
  variant: 'h6',
}))
