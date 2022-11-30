import { Paper, Toolbar, ToolbarProps } from '@mui/material'
import { SelectExProps } from '@xylabs/react-common'
import { FlexRow } from '@xylabs/react-flexbox'
import { ArchiveSelectEx } from '@xyo-network/react-api'
import { DarkModeIconButton } from '@xyo-network/react-app-settings'
import { AuthSetsStatusIconButton } from '@xyo-network/react-auth-sets'
import { NetworkSelectEx, NetworkSelectExProps } from '@xyo-network/react-network'
import { ReactNode } from 'react'

import { SiteMenu, SiteMenuProps } from '../../SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  networkSelectProps?: NetworkSelectExProps
  archiveSelectProps?: SelectExProps<string>
  hideNetworkSelect?: boolean
  hideArchiveSelect?: boolean
  darkModeButton?: boolean
  authButton?: boolean
  menuItems?: ReactNode
  precedingChildren?: ReactNode
  developerMode?: boolean
  onMenuToggle?: SiteMenuProps['onMenuToggle']
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  precedingChildren,
  networkSelectProps,
  archiveSelectProps,
  hideNetworkSelect,
  hideArchiveSelect,
  darkModeButton = false,
  authButton = false,
  menuItems,
  onMenuToggle,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      {precedingChildren}
      {hideNetworkSelect ? null : (
        <FlexRow marginX={0.5}>
          <Paper variant="elevation">
            <NetworkSelectEx fullWidth {...networkSelectProps} />
          </Paper>
        </FlexRow>
      )}
      {hideArchiveSelect ? null : (
        <FlexRow marginX={0.5}>
          <Paper variant="elevation">
            <ArchiveSelectEx fullWidth {...archiveSelectProps} />
          </Paper>
        </FlexRow>
      )}
      {children}
      {authButton ? <AuthSetsStatusIconButton color="inherit" /> : null}
      {darkModeButton ? <DarkModeIconButton color="inherit" /> : null}
      {menuItems ? <SiteMenu onMenuToggle={onMenuToggle}>{menuItems}</SiteMenu> : null}
    </Toolbar>
  )
}
