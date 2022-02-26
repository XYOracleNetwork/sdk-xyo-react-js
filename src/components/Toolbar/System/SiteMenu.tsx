import { Menu as MenuIcon } from '@mui/icons-material'
import { IconButton, MenuItem, MenuItemProps } from '@mui/material'
import { FlexBoxProps, FlexRow, MenuEx } from '@xylabs/sdk-react'
import { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSettings } from '../../../contexts'

export interface SiteMenuProps extends FlexBoxProps {
  hideSettingsMenuItem?: boolean
  menuItems?: ReactElement<MenuItemProps>[]
}

export const SiteMenu: React.FC<SiteMenuProps> = ({ hideSettingsMenuItem, menuItems, ...props }) => {
  const [menuElement, setMenuElement] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(menuElement)
  const { darkMode } = useAppSettings()
  const navigate = useNavigate()

  const handleMenuClose = () => {
    setMenuElement(null)
  }
  return (
    <FlexRow {...props}>
      <IconButton
        size="large"
        onClick={(event) => {
          setMenuElement(event.currentTarget)
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>
      <MenuEx
        colorize="primary"
        mode={darkMode ? 'dark' : 'light'}
        anchorEl={menuElement}
        open={open}
        onClose={handleMenuClose}
      >
        {menuItems}
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
