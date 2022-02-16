import { Typography, useTheme } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

export interface ValueProps {
  value?: string | number | boolean | null
  paddingFactor?: number
  typographyVariant?: Variant
}

export const Value: React.FC<ValueProps> = ({ value, paddingFactor, typographyVariant = 'caption' }) => {
  const { spacing } = useTheme()
  const clampOffset = spacing((paddingFactor as number) * 2)
  const customThemeProps = {
    clamped: 'true',
    sx: { padding: paddingFactor, width: `clamp(75%, 100%, 100vw - ${clampOffset})` },
    title: value?.toString(),
  }
  return (
    <>
      {value !== undefined ? (
        <Typography variant={typographyVariant} fontFamily="monospace" fontWeight="light" {...customThemeProps}>
          {value}
        </Typography>
      ) : null}
    </>
  )
}
