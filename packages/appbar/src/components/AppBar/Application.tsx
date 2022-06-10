import { ToolbarProps } from '@mui/material'
import { AppBarEx, AppBarExProps } from '@xylabs/react-common'
import { ReactElement } from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar'

export interface ApplicationAppBarProps extends AppBarExProps {
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
}

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({ systemToolbar = <SystemToolbar />, contextToolbar = <ContextToolbar />, responsive = true, ...props }) => {
  return <AppBarEx systemToolbar={systemToolbar} contextToolbar={contextToolbar} position="sticky" responsive={responsive} {...props} />
}
