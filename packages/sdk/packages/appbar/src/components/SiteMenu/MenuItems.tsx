import { Collapse, IconButton, List, ListItemProps, ListItemTextProps, Tooltip, useTheme } from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode, useState } from 'react'
import { VscChevronDown, VscInfo } from 'react-icons/vsc'
import { To } from 'react-router-dom'

import { useCollapsible } from '../../contexts'
import { SiteMenuListItemBase } from './lib'
import { MenuIcon } from './MenuIcon'
import { MenuListItem } from './MenuListItem'
import { MenuListItemButtonEx } from './MenuListItemButtonEx'
import { MenuListItemText } from './MenuListItemText'

export interface SiteMenuListItemProps extends SiteMenuListItemBase, ListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  href?: string
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
  subNavListItems?: SubNavListItemProps[]
  tooltip?: string
  subNavOpen?: boolean
}

export interface SubNavListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  href?: string
  icon?: ReactNode
  onButtonClick?: ListItemButtonExProps['onClick']
  tooltip?: string
}

export const SiteMenuListItem: React.FC<SiteMenuListItemProps> = ({
  style,
  subNavListItems,
  iconOnly,
  tooltip,
  collapseEnd,
  icon,
  primary,
  onButtonClick,
  to,
  ...props
}) => {
  const { dense } = props
  const theme = useTheme()
  const { collapse } = useCollapsible()
  const [openSubNav, setOpenSubNav] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <MenuListItem disableGutters style={{ whiteSpace: 'nowrap', ...style }} iconOnly={iconOnly} {...props}>
      <MenuListItemButtonEx
        iconOnly={iconOnly}
        onClick={onButtonClick}
        collapseEnd={collapseEnd}
        dense={dense}
        to={to}
        sx={{ justifyContent: 'space-between' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <FlexRow>
          <MenuIcon icon={icon} paddingRight={theme.spacing(1)} color={hovered ? 'primary' : 'inherit'} />
          <MenuListItemText primary={primary} iconOnly={iconOnly} />
        </FlexRow>
        <FlexRow>
          {subNavListItems ? (
            <IconButton onClick={() => setOpenSubNav(!openSubNav)} sx={{ marginRight: theme.spacing(1) }}>
              <VscChevronDown fontSize="16px" />
            </IconButton>
          ) : null}
          {tooltip ? (
            <Tooltip title={tooltip} placement="right">
              {/* Needs div so it can work, the hovering doesn't work with a FlexCol */}
              <div>
                <FlexCol justifyContent="center">
                  <VscInfo color="grey" />
                </FlexCol>
              </div>
            </Tooltip>
          ) : null}
        </FlexRow>
      </MenuListItemButtonEx>
      {subNavListItems ? (
        <Collapse in={collapse == true ? false : openSubNav}>
          <List>
            {subNavListItems.map((item, index) => {
              return <SiteMenuListItem sx={{ pl: theme.spacing(1) }} key={index} {...item} />
            })}
          </List>
        </Collapse>
      ) : null}
    </MenuListItem>
  )
}
