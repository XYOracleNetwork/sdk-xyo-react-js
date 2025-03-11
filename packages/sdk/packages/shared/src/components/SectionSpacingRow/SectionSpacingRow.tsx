import { useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import React from 'react'

export const SectionSpacingRow = ({
  ref, children, sx, ...props
}: FlexBoxProps & { ref?: React.RefObject<HTMLDivElement | null> }) => {
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
}

SectionSpacingRow.displayName = 'SectionSpacingRow'
