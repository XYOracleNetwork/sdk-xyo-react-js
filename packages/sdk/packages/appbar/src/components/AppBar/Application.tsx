import type { ToolbarProps } from '@mui/material'
import type { AppBarExProps } from '@xylabs/react-appbar'
import { AppBarEx } from '@xylabs/react-appbar'
import type { ReactElement } from 'react'
import React from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar/index.ts'

export interface ApplicationAppBarProps extends AppBarExProps {
  contextToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
  systemToolbar?: ReactElement<ToolbarProps>
}

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({ systemToolbar, contextToolbar, responsive = true, ...props }) => {
  return (
    <AppBarEx
      systemToolbar={systemToolbar ?? <SystemToolbar />}
      contextToolbar={contextToolbar ?? <ContextToolbar />}
      position="sticky"
      responsive={responsive}
      {...props}
    />
  )
}
