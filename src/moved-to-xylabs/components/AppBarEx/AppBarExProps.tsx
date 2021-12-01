/* eslint-disable @delagen/deprecation/deprecation */
import { AppBarProps, ToolbarProps } from '@mui/material'
import { ReactElement } from 'react'

/** @deprecated Moved to @xylabs/sdk-react */
interface AppBarExProps extends AppBarProps {
  container?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
}

export default AppBarExProps
