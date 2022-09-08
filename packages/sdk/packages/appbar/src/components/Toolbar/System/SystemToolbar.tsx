import { Paper, Toolbar, ToolbarProps } from '@mui/material'
import { SelectExProps } from '@xylabs/react-common'
import { FlexRow } from '@xylabs/react-flexbox'
import { DarkModeIconButton } from '@xyo-network/react-app-settings'
import { ArchiveSelectEx } from '@xyo-network/react-archive'
import { AuthStatusIconButton } from '@xyo-network/react-auth'
import { AuthSetsStatusIconButton } from '@xyo-network/react-auth-sets'
import { NetworkSelectEx, NetworkSelectExProps } from '@xyo-network/react-network'
import { ReactNode } from 'react'

import { SiteMenu } from '../../SiteMenu'

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
  developerMode = false,
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
      {authButton ? developerMode ? <AuthSetsStatusIconButton color="inherit" /> : <AuthStatusIconButton color="inherit" /> : null}
      {darkModeButton ? <DarkModeIconButton color="inherit" /> : null}
      {menuItems ? <SiteMenu>{menuItems}</SiteMenu> : null}
    </Toolbar>
  )
}
