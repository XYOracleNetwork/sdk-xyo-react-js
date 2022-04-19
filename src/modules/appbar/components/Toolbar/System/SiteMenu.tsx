import { Menu as MenuIcon } from '@mui/icons-material'
import { MenuItem } from '@mui/material'
import { FlexBoxProps, FlexRow, LinkEx, MenuEx } from '@xylabs/sdk-react'
import { useRef, useState } from 'react'
import { To, useNavigate } from 'react-router-dom'

import { useAppSettings } from '../../../../settings'

export interface SiteMenuItem {
  name: string
  to?: To
  href?: string
  onClick?: () => void
}

export interface SiteMenuProps extends FlexBoxProps {
  hideSettingsMenuItem?: boolean
  menuItems?: SiteMenuItem[]
}

export const SiteMenu: React.FC<SiteMenuProps> = ({ hideSettingsMenuItem, menuItems, ...props }) => {
  const [menuElement, setMenuElement] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(menuElement)
  const { darkMode } = useAppSettings()
  const navigate = useNavigate()

  const handleMenuClose = () => {
    setMenuElement(null)
  }

  const ref = useRef(null)

  return (
    <FlexRow alignItems="stretch" {...props}>
      <LinkEx
        color="inherit"
        onClick={() => {
          setMenuElement(ref.current)
        }}
      >
        <div style={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }} ref={ref}>
          <MenuIcon fontSize="large" />
        </div>
      </LinkEx>
      <MenuEx colorize="primary" mode={darkMode ? 'dark' : 'light'} anchorEl={menuElement} open={open} onClose={handleMenuClose}>
        {menuItems?.map(({ name, to, href, onClick }) => {
          return (
            <MenuItem
              key={name}
              onClick={() => {
                if (onClick) {
                  onClick()
                } else if (to) {
                  navigate(to)
                } else if (href) {
                  window.open(href)
                }
                handleMenuClose()
              }}
              disableRipple
            >
              {name}
            </MenuItem>
          )
        })}
        {hideSettingsMenuItem ? null : (
          <MenuItem
            onClick={() => {
              navigate('/settings')
              handleMenuClose()
            }}
            disableRipple
          >
            Settings
          </MenuItem>
        )}
      </MenuEx>
    </FlexRow>
  )
}
