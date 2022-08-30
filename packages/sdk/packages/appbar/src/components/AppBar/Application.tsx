import { ToolbarProps } from '@mui/material'
import { AppBarEx, AppBarExProps } from '@xylabs/react-appbar'
import { ReactElement } from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar'

export interface ApplicationAppBarProps extends AppBarExProps {
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
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
