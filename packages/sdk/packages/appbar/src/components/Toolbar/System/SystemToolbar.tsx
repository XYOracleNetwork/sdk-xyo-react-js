import { Paper, Toolbar, ToolbarProps } from '@mui/material'
import { SelectExProps } from '@xylabs/react-common'
import { FlexRow } from '@xylabs/react-flexbox'
import { DarkModeIconButton } from '@xyo-network/react-app-settings'
import { AuthSetsStatusIconButton } from '@xyo-network/react-auth-sets'
import { NetworkSelectEx, NetworkSelectExProps } from '@xyo-network/react-network'
import { ReactNode } from 'react'

import { SiteMenu, SiteMenuProps } from '../../SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  archiveSelectProps?: SelectExProps<string>
  authButton?: boolean
  darkModeButton?: boolean
  developerMode?: boolean
  hideArchiveSelect?: boolean
  hideNetworkSelect?: boolean
  menuItems?: ReactNode
  networkSelectProps?: NetworkSelectExProps
  onMenuToggle?: SiteMenuProps['onMenuToggle']
  precedingChildren?: ReactNode
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  archiveSelectProps,
  authButton = false,
  children,
  darkModeButton = false,
  hideNetworkSelect,
  hideArchiveSelect,
  menuItems,
  networkSelectProps,
  onMenuToggle,
  precedingChildren,
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
