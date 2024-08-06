import { useTheme } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import type { DeclarationReflection } from 'typedoc'

import { ContainerReflectionViewer, ContainerReflectionViewerProps } from './Container.js'
import { DeclarationReflectionViewer } from './Declaration.js'

export interface DeclarationContainerReflectionViewerProps extends ContainerReflectionViewerProps {
  reflection: DeclarationReflection
}

export const DeclarationContainerReflectionViewer: React.FC<DeclarationContainerReflectionViewerProps> = ({
  reflection,
  lookup,
  itemRenderer = DeclarationReflectionViewer,
  ...props
}) => {
  const { hash } = useLocation()
  const theme = useTheme()

  return (
    <ContainerReflectionViewer
      title="DeclarationContainerReflectionViewer"
      paper={hash.slice(1) === reflection.name}
      bgcolor={hash.slice(1) === reflection.name ? theme.palette.background.default : undefined}
      lookup={lookup}
      itemRenderer={itemRenderer}
      reflection={reflection}
      {...props}
    />
  )
}
