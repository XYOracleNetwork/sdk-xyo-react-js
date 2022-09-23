import { Collapse, IconButton, List, ListItemProps, ListItemTextProps, Tooltip, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { ListItemButtonExProps } from '@xyo-network/react-shared'
import { ReactNode, useState } from 'react'
import { VscChevronDown, VscInfo } from 'react-icons/vsc'
import { To } from 'react-router-dom'

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
  small?: boolean
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
  small,
  collapseEnd,
  icon,
  primary,
  onButtonClick,
  to,
  ...props
}) => {
  const { dense } = props
  const theme = useTheme()
  const [openSubNav, setOpenSubNav] = useState(false)
  const [hovered, setHovered] = useState(false)
  return (
    <MenuListItem
      disableGutters
      style={{ whiteSpace: 'nowrap', ...style }}
      iconOnly={iconOnly}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...props}
    >
      <MenuListItemButtonEx
        iconOnly={iconOnly}
        onClick={onButtonClick}
        collapseEnd={collapseEnd}
        dense={dense}
        to={to}
        sx={{ justifyContent: 'space-between' }}
      >
        <FlexRow>
          <MenuIcon
            icon={icon}
            fontSize={small ? '14px' : '16px'}
            paddingRight={theme.spacing(1)}
            color={hovered ? theme.palette.primary.main : 'inherit'}
          />
          <MenuListItemText primary={primary} iconOnly={iconOnly} sx={{ fontSize: small ? theme.typography.caption.fontSize : '' }} />
        </FlexRow>
        <FlexRow>
          {subNavListItems ? (
            <IconButton onClick={() => setOpenSubNav(!openSubNav)} sx={{ marginRight: theme.spacing(1) }}>
              <VscChevronDown fontSize={small ? '14px' : '16px'} />
            </IconButton>
          ) : null}
          {tooltip ? (
            <Tooltip title={tooltip} placement="right">
              <div>
                <VscInfo color="disabled" />
              </div>
            </Tooltip>
          ) : null}
        </FlexRow>
      </MenuListItemButtonEx>
      {subNavListItems && !iconOnly ? (
        <Collapse in={openSubNav}>
          <List>
            {subNavListItems.map((item, index) => {
              return <SiteMenuListItem key={index} {...item} />
            })}
          </List>
        </Collapse>
      ) : null}
    </MenuListItem>
  )
}
