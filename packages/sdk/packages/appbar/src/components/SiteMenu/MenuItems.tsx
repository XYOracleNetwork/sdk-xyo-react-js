import {
  Collapse,
  CollapseProps,
  IconButton,
  IconButtonProps,
  List,
  ListItemProps,
  ListItemText,
  ListItemTextProps,
  Tooltip,
  TooltipProps,
  useTheme,
} from '@mui/material'
import { FlexCol, FlexRow } from '@xylabs/react-flexbox'
import { LinkEx, LinkExProps } from '@xylabs/react-link'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { VscChevronDown, VscInfo } from 'react-icons/vsc'
import { To } from 'react-router-dom'

import { useCollapsible } from '../../contexts'
import { SiteMenuListItemBase } from './lib'
import { MenuIcon } from './MenuIcon'
import { MenuListItem } from './MenuListItem'

interface NavListItemProps {
  primary: ListItemTextProps['primary']
  to?: To
  href?: string
  icon?: ReactNode
  onButtonClick?: LinkExProps['onClick']
  tooltip?: string
}

export interface SiteMenuListItemProps extends NavListItemProps, SiteMenuListItemBase, ListItemProps {
  subNavListItems?: NavListItemProps[]
  subNavOpen?: boolean
  iconOnly?: boolean
}

export const SiteMenuListItem: React.FC<SiteMenuListItemProps> = ({
  style,
  subNavListItems,
  iconOnly,
  tooltip,
  icon,
  primary,
  onButtonClick,
  to,
  sx,
  ...props
}) => {
  const { dense } = props
  const theme = useTheme()
  const { collapse } = useCollapsible()
  const [openSubNav, setOpenSubNav] = useState(false)
  const [hovered, setHovered] = useState(false)
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
            <MenuIcon icon={icon} paddingRight={theme.spacing(1)} color={hovered ? 'secondary' : 'inherit'} />
            <ListItemText primary={primary} />
          </FlexRow>
        </LinkEx>
        <FlexRow style={{ marginLeft: theme.spacing(1) }}>
          {subNavListItems ? <SubNavToggleIconButton setOpenSubNav={setOpenSubNav} openSubNav={openSubNav} /> : null}
          {tooltip ? <ListItemTooltip title={tooltip} /> : null}
        </FlexRow>
      </MenuListItem>
      {subNavListItems ? (
        <SubNavListItemsCollapse openSubNav={openSubNav} collapse={collapse} subNavListItems={subNavListItems} dense={dense} />
      ) : null}
    </>
  )
}

interface ListItemTooltipProps {
  title?: string
}

const ListItemTooltip: React.FC<ListItemTooltipProps> = ({ title, ...props }) => {
  return (
    <Tooltip title={title} placement="right" {...props}>
      {/* Needs div so it can work, the hovering doesn't work with a FlexCol */}
      <div>
        <FlexCol justifyContent="center">
          <VscInfo color="grey" />
        </FlexCol>
      </div>
    </Tooltip>
  )
}

interface SubNavToggleIconButtonProps extends IconButtonProps {
  openSubNav?: boolean
  setOpenSubNav?: Dispatch<SetStateAction<boolean>>
}

const SubNavToggleIconButton: React.FC<SubNavToggleIconButtonProps> = ({ setOpenSubNav, openSubNav }) => {
  const theme = useTheme()
  return (
    <IconButton
      onClick={(event) => {
        event.stopPropagation()
        setOpenSubNav?.(!openSubNav)
      }}
      sx={{ marginRight: theme.spacing(0.5) }}
    >
      <VscChevronDown fontSize="16px" />
    </IconButton>
  )
}

interface SubNavListItemsCollapseProps extends CollapseProps {
  openSubNav?: boolean
  collapse?: boolean
  subNavListItems?: NavListItemProps[]
  dense?: boolean
}

const SubNavListItemsCollapse: React.FC<SubNavListItemsCollapseProps> = ({ collapse, openSubNav, subNavListItems, dense, ...props }) => {
  const theme = useTheme()
  return (
    <Collapse in={collapse == true ? false : openSubNav} {...props}>
      <List>
        {subNavListItems?.map((item, index) => (
          <SiteMenuListItem dense={dense} sx={{ pl: theme.spacing(1) }} key={index} {...item} />
        ))}
      </List>
    </Collapse>
  )
}
