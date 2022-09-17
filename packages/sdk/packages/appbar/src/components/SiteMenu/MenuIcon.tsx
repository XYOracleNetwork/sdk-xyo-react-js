import { Typography } from '@mui/material'
import { TypographyExProps } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

export interface MenuIconProps extends TypographyExProps {
  icon?: ReactNode
}

export const MenuIcon: React.FC<MenuIconProps> = ({ icon, ...props }) => {
  return (
    <Typography display="flex" variant="caption" {...props}>
      {icon}
    </Typography>
  )
}
