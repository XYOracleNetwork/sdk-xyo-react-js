import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexGrowRow } from '@xylabs/react-flexbox'
import React, { forwardRef } from 'react'

export const SectionSpacingRow = forwardRef<HTMLDivElement, FlexBoxProps>(({ children, sx, ...props }, ref) => {
  const theme = useTheme()
  return (
    <FlexGrowRow
      sx={{
        paddingBottom: { md: theme.spacing(5), xs: theme.spacing(5) },
        paddingTop: { md: theme.spacing(5), xs: theme.spacing(5) },
        ...sx,
      }}
      width="100%"
      ref={ref}
      {...props}
    >
      {children}
    </FlexGrowRow>
  )
})

SectionSpacingRow.displayName = 'SectionSpacingRow'
