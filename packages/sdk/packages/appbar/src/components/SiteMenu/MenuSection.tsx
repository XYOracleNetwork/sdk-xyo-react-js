import { Collapse, ListSubheader } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexCol } from '@xylabs/react-flexbox'
import React from 'react'

import type { MenuListItemProps } from './MenuListItem/index.ts'
import { MenuListItemContainer } from './MenuListItem/index.ts'

export interface MenuSectionProps extends FlexBoxProps {
  iconMenuTextSpacing?: string
  listItems: MenuListItemProps[]
  showTitle?: boolean
  title: string
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  iconMenuTextSpacing, listItems, showTitle = true, title, ...props
}) => {
  return (
    <FlexCol alignItems="stretch" {...props}>
      <Collapse in={showTitle} timeout={700}>
        <ListSubheader>{title}</ListSubheader>
      </Collapse>

      {listItems.map((item, index) => (
        <MenuListItemContainer key={index} iconMenuTextSpacing={iconMenuTextSpacing} {...item}></MenuListItemContainer>
      ))}
    </FlexCol>
  )
}
