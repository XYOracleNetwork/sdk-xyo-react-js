import { Paper, Toolbar, ToolbarProps } from '@mui/material'
import { FlexRow, SelectExProps } from '@xylabs/sdk-react'
import { ArchiveSelectEx } from '@xyo-network/react-archive'
import { AuthStatusIconButton } from '@xyo-network/react-auth'
import { NetworkSelectEx, NetworkSelectExProps } from '@xyo-network/react-network'
import { DarkModeIconButton } from '@xyo-network/react-shared'
import { ReactNode } from 'react'

import { SiteMenu } from '../../SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  networkSelectProps?: NetworkSelectExProps
  archiveSelectProps?: SelectExProps<string>
  hideNetworkSelect?: boolean
  hideArchiveSelect?: boolean
  menu?: ReactNode
  darkModeButton?: boolean
  authButton?: boolean
  noMenu?: boolean
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  networkSelectProps,
  archiveSelectProps,
  hideNetworkSelect,
  hideArchiveSelect,
  menu,
  darkModeButton = false,
  authButton = false,
  noMenu = false,
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
      {noMenu ? null : <SiteMenu>{menu}</SiteMenu>}
    </Toolbar>
  )
}
