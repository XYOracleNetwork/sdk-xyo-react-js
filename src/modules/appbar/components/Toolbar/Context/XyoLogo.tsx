import { useTheme } from '@mui/material'

export const XyoLogo: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (
  props
) => {
  const theme = useTheme()
  const logoUrl =
    theme.palette.mode === 'dark'
      ? 'https://cdn.xy.company/img/brand/XYO/XYO_icon_white.svg'
      : 'https://cdn.xy.company/img/brand/XYO/XYO_icon_white.svg'
  return <img src={logoUrl} {...props} />
}
