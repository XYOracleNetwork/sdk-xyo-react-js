import { Toolbar, ToolbarProps } from '@mui/material'
import { FlexRow, SelectExProps } from '@xylabs/sdk-react'

import { NetworkSelectEx } from '../../../modules'
import { AuthStatusIconButton } from '../../Auth'
import { ArchiveSelectEx } from './ArchiveSelectEx'
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
      <FlexRow marginX={0.5} width={120}>
        <NetworkSelectEx fullWidth {...networkSelectProps} />
      </FlexRow>
      <FlexRow marginX={0.5} width={120}>
        <ArchiveSelectEx fullWidth {...archiveSelectProps} />
      </FlexRow>
      {children}
      <AuthStatusIconButton />
      <SiteMenu {...siteMenuProps} />
    </Toolbar>
  )
}
