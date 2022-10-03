import { ListItemProps, ListItemText, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { LinkEx } from '@xylabs/react-link'
import { useState } from 'react'

import { useCollapsible } from '../../../contexts'
import { NavListItemProps, SiteMenuListItemBase } from '../lib'
import { ListItemTooltip, MenuIcon, MenuListItem } from './list-item-components'
import { SubNavListItemsCollapse, SubNavToggleIconButton } from './sub-nav'

export interface MenuListItemProps extends NavListItemProps, SiteMenuListItemBase, ListItemProps {
  subNavListItems?: NavListItemProps[]
  subNavOpen?: boolean
  iconOnly?: boolean
  iconMenuTextSpacing?: string
}

export const MenuListItemContainer: React.FC<MenuListItemProps> = ({
  style,
  subNavListItems,
  iconOnly,
  tooltip,
  icon,
  primary,
  onButtonClick,
  to,
  sx,
  iconMenuTextSpacing,
  ...props
}) => {
  const { dense } = props
  const theme = useTheme()
  const { collapse } = useCollapsible()
  const [openSubNav, setOpenSubNav] = useState(false)
  const [hovered, setHovered] = useState(false)
  const resolvedIconMenuTextSpacing = iconMenuTextSpacing ? iconMenuTextSpacing : theme.spacing(1)

  return (
    <>
      <MenuListItem
        disableGutters
        iconOnly={iconOnly}
        onClick={onButtonClick}
        dense={dense}
        sx={{ justifyContent: 'space-between', ...sx }}
        style={{ whiteSpace: 'nowrap', ...style }}
        {...props}
      >
        <LinkEx
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          color="inherit"
          to={to}
          sx={{
            '& :hover': {
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          }}
        >
          <FlexRow>
            <MenuIcon icon={icon} paddingRight={resolvedIconMenuTextSpacing} color={hovered ? 'secondary' : 'inherit'} />
            <ListItemText primary={primary} />
          </FlexRow>
        </LinkEx>
        <FlexRow style={{ marginLeft: theme.spacing(1) }}>
          {subNavListItems ? <SubNavToggleIconButton setOpenSubNav={setOpenSubNav} openSubNav={openSubNav} /> : null}
          {tooltip ? <ListItemTooltip title={tooltip} /> : null}
        </FlexRow>
      </MenuListItem>
      {subNavListItems ? (
        <SubNavListItemsCollapse openSubNav={openSubNav} collapse={collapse}>
          {subNavListItems?.map((item, index) => (
            <MenuListItemContainer dense={dense} sx={{ pl: theme.spacing(1) }} key={index} {...item} />
          ))}
        </SubNavListItemsCollapse>
      ) : null}
    </>
  )
}
