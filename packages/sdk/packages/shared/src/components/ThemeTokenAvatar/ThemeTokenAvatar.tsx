import { Avatar, AvatarProps, useTheme } from '@mui/material'
import React from 'react'

export const ThemeTokenAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  const theme = useTheme()
  return <Avatar sx={{ background: theme.palette.common.white }} {...props} />
}
