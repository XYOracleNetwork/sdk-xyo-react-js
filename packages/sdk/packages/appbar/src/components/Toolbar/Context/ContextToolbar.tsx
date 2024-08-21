import type { ToolbarProps } from '@mui/material'
import { Toolbar } from '@mui/material'
import React from 'react'
import type { To } from 'react-router-dom'

import { LogoLinkEx } from './LogoLinkEx.tsx'

export interface ContextToolbarProps extends ToolbarProps {
  logoTo?: To
  version?: boolean
}

export const ContextToolbar: React.FC<ContextToolbarProps> = ({
  logoTo = '/', version = false, ...props
}) => {
  return (
    <Toolbar {...props}>
      <LogoLinkEx version={version} to={logoTo} />
    </Toolbar>
  )
}
