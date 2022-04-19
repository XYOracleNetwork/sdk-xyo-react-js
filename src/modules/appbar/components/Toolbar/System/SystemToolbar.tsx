import { Toolbar, ToolbarProps } from '@mui/material'
import { FlexRow, SelectExProps } from '@xylabs/sdk-react'

import { ArchiveSelectEx } from '../../../../archive'
import { AuthStatusIconButton } from '../../../../auth'
import { NetworkSelectEx, NetworkSelectExProps } from '../../../../network'
import { DarkModeIconButton } from '../../../../settings'
import { SiteMenu, SiteMenuProps } from './SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  networkSelectProps?: NetworkSelectExProps
  archiveSelectProps?: SelectExProps<string>
  hideNetworkSelect?: boolean
  hideArchiveSelect?: boolean
  siteMenuProps?: SiteMenuProps
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
  siteMenuProps,
  darkModeButton = false,
  authButton = false,
  noMenu = false,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      {hideNetworkSelect ? null : (
        <FlexRow marginX={0.5} maxWidth={120}>
          <NetworkSelectEx fullWidth {...networkSelectProps} />
        </FlexRow>
      )}
      {hideArchiveSelect ? null : (
        <FlexRow marginX={0.5} maxWidth={120}>
          <ArchiveSelectEx fullWidth {...archiveSelectProps} />
        </FlexRow>
      )}
      {children}
      {authButton ? <AuthStatusIconButton /> : null}
      {darkModeButton ? <DarkModeIconButton /> : null}
      {noMenu ? null : <SiteMenu {...siteMenuProps} />}
    </Toolbar>
  )
}
