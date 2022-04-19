import { Typography, TypographyProps } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

export interface PropertyValueProps extends TypographyProps {
  value?: string | number | boolean | null
  paddingFactor?: number
  typographyVariant?: Variant
}

export const PropertyValue: React.FC<PropertyValueProps> = ({ value, paddingFactor, typographyVariant = 'caption', ...props }) => {
  const customThemeProps = {
    clamped: paddingFactor,
    title: value?.toString(),
  }
  return value !== undefined ? (
    <Typography variant={typographyVariant} fontFamily="monospace" fontWeight="light" {...customThemeProps} {...props}>
      {value}
    </Typography>
  ) : null
}
