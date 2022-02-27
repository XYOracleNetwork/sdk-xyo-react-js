import { Toolbar, ToolbarProps } from '@mui/material'
import { FlexRow, SelectExProps } from '@xylabs/sdk-react'

import { ArchiveSelectEx } from './ArchiveSelectEx'
import { NetworkSelectEx } from './NetworkSelectEx'
import { SiteMenu, SiteMenuProps } from './SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  networkSelectProps?: SelectExProps<string>
  archiveSelectProps?: SelectExProps<string>
  siteMenuProps?: SiteMenuProps
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  networkSelectProps,
  archiveSelectProps,
  siteMenuProps,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      <FlexRow marginX={0.5}>
        <NetworkSelectEx {...networkSelectProps} />
      </FlexRow>
      <FlexRow marginX={0.5}>
        <ArchiveSelectEx {...archiveSelectProps} />
      </FlexRow>
      {children}
      <SiteMenu {...siteMenuProps} />
    </Toolbar>
  )
}
