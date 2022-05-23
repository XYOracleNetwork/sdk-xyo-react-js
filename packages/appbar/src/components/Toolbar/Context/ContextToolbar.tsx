import { Toolbar, ToolbarProps } from '@mui/material'
import { To } from 'react-router-dom'

import { XyoLogoLinkEx } from './XyoLogoLinkEx'

export interface ContextToolbarProps extends ToolbarProps {
  logoTo?: To
  version?: boolean
}

export const ContextToolbar: React.FC<ContextToolbarProps> = ({ logoTo = '/', version = false, ...props }) => {
  return (
    <Toolbar {...props}>
      <XyoLogoLinkEx version={version} to={logoTo} />
    </Toolbar>
  )
}
