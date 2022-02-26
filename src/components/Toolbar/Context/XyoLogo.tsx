import { useTheme } from '@mui/material'

export const XyoLogo: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (
  props
) => {
  const theme = useTheme()
  const logoUrl =
    theme.palette.mode === 'dark'
      ? 'https://cdn.xy.company/img/brand/XYO/XYO_icon_white.png'
      : 'https://cdn.xy.company/img/brand/XYO/XYO_icon_black.png'
  return <img src={logoUrl} {...props} />
}
