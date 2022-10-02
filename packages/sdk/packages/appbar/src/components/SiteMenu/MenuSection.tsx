import { Collapse, ListSubheader } from '@mui/material'
import { FlexBoxProps, FlexCol } from '@xylabs/react-flexbox'

import { MenuListItemContainer, MenuListItemProps } from './MenuListItem'

export interface MenuSectionProps extends FlexBoxProps {
  title: string
  listItems: MenuListItemProps[]
  showTitle?: boolean
  iconMenuTextSpacing?: string
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, listItems, iconMenuTextSpacing, showTitle = true, ...props }) => {
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
