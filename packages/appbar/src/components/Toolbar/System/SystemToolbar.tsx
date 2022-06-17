import { Paper, Toolbar, ToolbarProps } from '@mui/material'
import { SelectExProps } from '@xylabs/react-common'
import { FlexRow } from '@xylabs/react-flexbox'
import { DarkModeIconButton } from '@xyo-network/react-app-settings'
import { ArchiveSelectEx } from '@xyo-network/react-archive'
import { AuthStatusIconButton } from '@xyo-network/react-auth'
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
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  networkSelectProps,
  archiveSelectProps,
  hideNetworkSelect,
  hideArchiveSelect,
  darkModeButton = false,
  authButton = false,
  menuItems,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      {hideNetworkSelect ? null : (
        <FlexRow marginX={0.5} maxWidth={120}>
          <Paper variant="elevation">
            <NetworkSelectEx fullWidth {...networkSelectProps} />
          </Paper>
        </FlexRow>
      )}
      {hideArchiveSelect ? null : (
        <FlexRow marginX={0.5} maxWidth={120}>
          <Paper variant="elevation">
            <ArchiveSelectEx fullWidth {...archiveSelectProps} />
          </Paper>
        </FlexRow>
      )}
      {children}
      {authButton ? <AuthStatusIconButton color="inherit" /> : null}
      {darkModeButton ? <DarkModeIconButton color="inherit" /> : null}
      {menuItems ? <SiteMenu>{menuItems}</SiteMenu> : null}
    </Toolbar>
  )
}
