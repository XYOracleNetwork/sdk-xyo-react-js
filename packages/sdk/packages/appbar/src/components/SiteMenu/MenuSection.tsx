import { List, ListProps, ListSubheader } from '@mui/material'

import { SiteMenuListItem, SiteMenuListItemProps } from './MenuItems'

export interface MenuSectionProps extends ListProps {
  title: string
  listItems: SiteMenuListItemProps[]
  showTitle?: boolean
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, listItems, showTitle = true, ...props }) => {
  return (
    <List {...props}>
      {showTitle ? <ListSubheader>{title}</ListSubheader> : null}
      {listItems.map((item, index) => (
        <>
          <SiteMenuListItem key={index} {...item}></SiteMenuListItem>
        </>
      ))}
    </List>
  )
}
