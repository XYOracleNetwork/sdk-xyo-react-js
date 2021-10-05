import { AppBarProps, ToolbarProps } from '@mui/material'
import { ReactElement } from 'react'

interface AppBarExProps extends AppBarProps {
  container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
}

export default AppBarExProps
