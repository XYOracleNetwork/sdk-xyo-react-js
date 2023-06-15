import { Avatar, AvatarProps, useTheme } from '@mui/material'

export const ThemeTokenAvatar: React.FC<AvatarProps> = ({ ...props }) => {
  const theme = useTheme()
  return <Avatar sx={{ background: theme.palette.common.white }} {...props} />
}
