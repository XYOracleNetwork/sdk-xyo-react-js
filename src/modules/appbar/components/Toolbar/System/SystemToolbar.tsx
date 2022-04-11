import { Toolbar, ToolbarProps } from '@mui/material'
import { FlexRow, SelectExProps } from '@xylabs/sdk-react'

import { ArchiveSelectEx } from '../../../../archive'
import { AuthStatusIconButton } from '../../../../auth'
import { NetworkSelectEx } from '../../../../network'
import { DarkModeIconButton } from '../../../../settings'
import { SiteMenu, SiteMenuProps } from './SiteMenu'

export interface SystemToolbarProps extends ToolbarProps {
  networkSelectProps?: SelectExProps<string>
  archiveSelectProps?: SelectExProps<string>
  siteMenuProps?: SiteMenuProps
  darkModeButton?: boolean
  authButton?: boolean
  noMenu?: boolean
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  networkSelectProps,
  archiveSelectProps,
  siteMenuProps,
  darkModeButton = false,
  authButton = false,
  noMenu = false,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      <FlexRow marginX={0.5} maxWidth={120}>
        <NetworkSelectEx fullWidth {...networkSelectProps} />
      </FlexRow>
      <FlexRow marginX={0.5} maxWidth={120}>
        <ArchiveSelectEx fullWidth {...archiveSelectProps} />
      </FlexRow>
      {children}
      {authButton ? <AuthStatusIconButton /> : null}
      {darkModeButton ? <DarkModeIconButton /> : null}
      {noMenu ? null : <SiteMenu {...siteMenuProps} />}
    </Toolbar>
  )
}
