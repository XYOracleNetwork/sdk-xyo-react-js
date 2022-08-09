import { Card, CardProps, SxProps, Theme } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { useAppSettings } from '@xyo-network/react-app-settings'
import { useCallback } from 'react'

export const EmbedCardEx: React.FC<WithChildren<CardProps>> = ({ children, ...props }) => {
  const { darkMode } = useAppSettings()
  const cardProps = useCallback(() => {
    if (darkMode) {
      return props
    } else {
      const lightModeOverrides: { sx: SxProps<Theme> } = {
        sx: {
          bgcolor: props.elevation ? '#F6F5FA' : 'inherit',
        },
      }
      return {
        ...props,
        ...lightModeOverrides,
      }
    }
  }, [darkMode, props])

  return <Card {...cardProps()}>{children}</Card>
}
