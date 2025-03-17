import React from 'react'

export const Logo: React.FC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = (props) => {
  const logoUrl
    = 'https://cdn.xy.company/img/brand/XYO/XYO_icon_white.svg'
  return <img src={logoUrl} {...props} />
}
