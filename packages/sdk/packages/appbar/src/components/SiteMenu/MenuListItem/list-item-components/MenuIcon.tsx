import { Typography, TypographyProps } from '@mui/material'
import React, { ReactNode } from 'react'

export interface MenuIconProps extends TypographyProps {
  icon?: ReactNode
}

export const MenuIcon: React.FC<MenuIconProps> = ({ icon, ...props }) => {
  return (
    <Typography display="flex" {...props}>
      {icon}
    </Typography>
  )
}
