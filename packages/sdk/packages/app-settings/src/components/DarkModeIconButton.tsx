import { DarkModeRounded as DarkModeRoundedIcon, LightModeRounded as LightModeRoundedIcon } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import React from 'react'

import { useAppSettings } from '../contexts/index.ts'

export const DarkModeIconButton: React.FC<IconButtonProps> = (props) => {
  const { darkMode, enableDarkMode } = useAppSettings()

  const handleDarkModeChange = () => {
    enableDarkMode?.(!darkMode)
  }

  return (
    <IconButton onClick={handleDarkModeChange} {...props}>
      {darkMode
        ? <DarkModeRoundedIcon />
        : <LightModeRoundedIcon />}
    </IconButton>
  )
}
