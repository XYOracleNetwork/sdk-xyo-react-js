import { ToolbarProps } from '@mui/material'
import { AppBarEx, AppBarExProps } from '@xylabs/react-appbar'
import { ReactElement } from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar/index.js'

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
