import { Toolbar, ToolbarProps, useMediaQuery, useTheme } from '@mui/material'
import { AppBarEx, AppBarExProps } from '@xylabs/react-common'
import { FlexGrowRow, FlexRow } from '@xylabs/react-flexbox'
import { ReactElement } from 'react'

import { ContextToolbar, SystemToolbar } from '../Toolbar'

export interface ApplicationAppBarProps extends AppBarExProps {
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
}

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({ systemToolbar, contextToolbar, children, responsive = true, ...props }) => {
  const { breakpoints } = useTheme()
  const belowSm = useMediaQuery(breakpoints.down('sm'))
  return (
    <AppBarEx position="sticky" {...props}>
      <FlexRow flexWrap="nowrap" justifyContent="flex-start">
        {contextToolbar ?? <ContextToolbar version />}
        <FlexGrowRow>{belowSm && responsive ? null : children}</FlexGrowRow>
        {systemToolbar ?? <SystemToolbar />}
      </FlexRow>
      {belowSm && children && responsive ? <Toolbar>{children}</Toolbar> : null}
    </AppBarEx>
  )
}
