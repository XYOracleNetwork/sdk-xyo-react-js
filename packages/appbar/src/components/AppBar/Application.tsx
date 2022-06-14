import { Toolbar, ToolbarProps } from '@mui/material'
import { AppBarEx, AppBarExProps } from '@xylabs/react-common'
import { ReactElement, ReactNode } from 'react'

import { SiteMenu } from '../SiteMenu'
import { ContextToolbar, SystemToolbar } from '../Toolbar'

export interface ApplicationAppBarProps extends AppBarExProps {
  contextToolbar?: ReactElement<ToolbarProps>
  systemToolbar?: ReactElement<ToolbarProps>
  responsive?: boolean
  menuItems?: ReactNode
}

export const ApplicationAppBar: React.FC<ApplicationAppBarProps> = ({
  menuItems,
  menu,
  systemToolbar = <SystemToolbar />,
  contextToolbar = <ContextToolbar />,
  responsive = true,
  ...props
}) => {
  return (
    <AppBarEx
      systemToolbar={systemToolbar}
      contextToolbar={contextToolbar}
      menu={
        menu ?? menuItems ? (
          <Toolbar>
            <SiteMenu>{menuItems}</SiteMenu>
          </Toolbar>
        ) : undefined
      }
      position="sticky"
      responsive={responsive}
      {...props}
    />
  )
}
