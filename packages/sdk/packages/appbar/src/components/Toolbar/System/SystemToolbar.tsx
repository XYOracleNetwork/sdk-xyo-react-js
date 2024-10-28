import { Paper } from '@mui/material'
import {
  type SiteMenuProps, SystemToolbar, type SystemToolbarProps,
} from '@xylabs/react-appbar'
import { FlexRow } from '@xylabs/react-flexbox'
import type { NetworkSelectExProps } from '@xyo-network/react-network'
import { NetworkSelectEx } from '@xyo-network/react-network'
import type { ReactNode } from 'react'
import React from 'react'

export interface XyoSystemToolbarProps extends SystemToolbarProps {
  darkModeButton?: boolean
  developerMode?: boolean
  hideNetworkSelect?: boolean
  menuItems?: ReactNode
  networkSelectProps?: NetworkSelectExProps
  onMenuToggle?: SiteMenuProps['onMenuToggle']
  precedingChildren?: ReactNode
}

export const XyoSystemToolbar: React.FC<XyoSystemToolbarProps> = ({
  children,
  hideNetworkSelect,
  networkSelectProps,
  precedingChildren,
  ...props
}) => {
  return (
    <SystemToolbar {...props}>
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
    </SystemToolbar>
  )
}
