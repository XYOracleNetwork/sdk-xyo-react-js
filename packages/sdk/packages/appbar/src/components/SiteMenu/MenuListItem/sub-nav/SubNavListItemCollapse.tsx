import type { CollapseProps } from '@mui/material'
import { Collapse, List } from '@mui/material'
import type { WithChildren } from '@xylabs/react-shared'
import React from 'react'

import type { NavListItemProps } from '../../lib/index.ts'

export interface SubNavListItemsCollapseProps extends WithChildren, CollapseProps {
  collapse?: boolean
  openSubNav?: boolean
  subNavListItems?: NavListItemProps[]
}

export const SubNavListItemsCollapse: React.FC<SubNavListItemsCollapseProps> = ({ collapse, openSubNav, children, ...props }) => {
  return (
    <Collapse in={collapse == true ? false : openSubNav} {...props}>
      <List>{children}</List>
    </Collapse>
  )
}
