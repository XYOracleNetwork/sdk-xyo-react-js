import { styled } from '@mui/material'
import type { TypographyExProps } from '@xyo-network/react-shared'
import { TypographyEx } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React from 'react'

export const ColumnHeadingTypography: React.FC<PropsWithChildren<TypographyExProps>> = ({ children, ...props }) => {
  return <StyledColumnHeadingTypography {...props}>{children}</StyledColumnHeadingTypography>
}

const StyledColumnHeadingTypography = styled(TypographyEx, { name: 'styledColumnHeadingTypography' })(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 200,
  paddingBottom: theme.spacing(1),
  textTransform: 'uppercase',
  variant: 'h6',
}))
