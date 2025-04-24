import type { AvatarProps } from '@mui/material'
import { Avatar, useTheme } from '@mui/material'
import React from 'react'

export const ThemeTokenAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  const theme = useTheme()
  return <Avatar sx={{ background: theme.vars.palette.common.white }} {...props} />
}
