import type { ToolbarProps } from '@mui/material'
import { Paper, Toolbar } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { DarkModeIconButton } from '@xyo-network/react-app-settings'
import type { NetworkSelectExProps } from '@xyo-network/react-network'
import { NetworkSelectEx } from '@xyo-network/react-network'
import type { ReactNode } from 'react'
import React from 'react'

import type { SiteMenuProps } from '../../SiteMenu/index.ts'
import { SiteMenu } from '../../SiteMenu/index.ts'

export interface SystemToolbarProps extends ToolbarProps {
  darkModeButton?: boolean
  developerMode?: boolean
  hideNetworkSelect?: boolean
  menuItems?: ReactNode
  networkSelectProps?: NetworkSelectExProps
  onMenuToggle?: SiteMenuProps['onMenuToggle']
  precedingChildren?: ReactNode
}

export const SystemToolbar: React.FC<SystemToolbarProps> = ({
  children,
  darkModeButton = false,
  hideNetworkSelect,
  menuItems,
  networkSelectProps,
  onMenuToggle,
  precedingChildren,
  ...props
}) => {
  return (
    <Toolbar {...props}>
      {precedingChildren}
      {hideNetworkSelect
        ? null
        : (
            <FlexRow marginX={0.5}>
              <Paper variant="elevation">
                <NetworkSelectEx fullWidth {...networkSelectProps} />
              </Paper>
            </FlexRow>
          )}
      {children}
      {darkModeButton
        ? <DarkModeIconButton color="inherit" />
        : null}
      {menuItems
        ? <SiteMenu onMenuToggle={onMenuToggle}>{menuItems}</SiteMenu>
        : null}
    </Toolbar>
  )
}
