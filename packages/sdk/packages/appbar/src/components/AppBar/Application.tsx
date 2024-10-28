import type { ToolbarProps } from '@mui/material'
import type { ApplicationAppBarProps } from '@xylabs/react-appbar'
import { ApplicationAppBar } from '@xylabs/react-appbar'
import type { ReactElement } from 'react'
import React from 'react'

import { XyoContextToolbar, XyoSystemToolbar } from '../Toolbar/index.ts'

export interface XyoApplicationAppBarProps extends ApplicationAppBarProps {
  contextToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
  systemToolbar?: ReactElement<ToolbarProps>
}

export const XyoApplicationAppBar: React.FC<XyoApplicationAppBarProps> = ({
  systemToolbar, contextToolbar, responsive = true, ...props
}) => {
  return (
    <ApplicationAppBar
      systemToolbar={systemToolbar ?? <XyoSystemToolbar />}
      contextToolbar={contextToolbar ?? <XyoContextToolbar />}
      position="sticky"
      responsive={responsive}
      {...props}
    />
  )
}
