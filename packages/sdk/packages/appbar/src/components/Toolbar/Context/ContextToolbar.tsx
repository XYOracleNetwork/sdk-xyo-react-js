import { Toolbar } from '@mui/material'
import type { ContextToolbarProps } from '@xylabs/react-appbar'
import type { ReactNode } from 'react'
import React from 'react'

import { LogoLinkEx } from './LogoLinkEx.tsx'

export interface XyoContextToolbarProps extends ContextToolbarProps {
  logo?: ReactNode
}

export const XyoContextToolbar: React.FC<XyoContextToolbarProps> = ({
  children, logo, logoTo = '/', version = false, ...props
}) => {
  return (
    <Toolbar {...props}>
      <LogoLinkEx logo={logo} version={version} to={logoTo} />
      {children}
    </Toolbar>
  )
}
