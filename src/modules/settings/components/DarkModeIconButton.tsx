import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded'
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded'
import { IconButton, IconButtonProps } from '@mui/material'

import { useAppSettings } from '../contexts'

export const DarkModeIconButton: React.FC<IconButtonProps> = (props) => {
  const { darkMode, enableDarkMode } = useAppSettings()

  const handleDarkModeChange = () => {
    enableDarkMode?.(!darkMode)
  }

  return (
    <IconButton onClick={handleDarkModeChange} {...props}>
      {darkMode ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  )
}
