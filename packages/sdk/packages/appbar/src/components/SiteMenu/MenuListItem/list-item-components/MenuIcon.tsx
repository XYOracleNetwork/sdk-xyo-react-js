import type { TypographyProps } from '@mui/material'
import { Typography } from '@mui/material'
import type { ReactNode } from 'react'
import React from 'react'

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
