import { useTheme } from '@mui/material'
import { FlexBoxProps, FlexGrowRow } from '@xylabs/sdk-react'

export const SectionSpacingRow: React.FC<FlexBoxProps> = ({ children, sx, ...props }) => {
  const theme = useTheme()
  return (
    <FlexGrowRow
      sx={{
        paddingBottom: { md: theme.spacing(5), xs: theme.spacing(5) },
        paddingTop: { md: theme.spacing(5), xs: theme.spacing(5) },
        ...sx,
      }}
      width="100%"
      {...props}
    >
      {children}
    </FlexGrowRow>
  )
}
