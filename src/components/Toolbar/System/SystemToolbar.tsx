import { Toolbar, ToolbarProps } from '@mui/material'
import { SelectExProps } from '@xylabs/sdk-react'

import { NetworkSelectEx } from './NetworkSelectEx'
import { SiteMenu, SiteMenuProps } from './SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  networkSelectProps?: SelectExProps<string>
  siteMenuProps?: SiteMenuProps
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  networkSelectProps,
  siteMenuProps,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      <NetworkSelectEx {...networkSelectProps} />
      {children}
      <SiteMenu {...siteMenuProps} />
    </Toolbar>
  )
}
