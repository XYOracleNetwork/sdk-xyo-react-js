import { MenuItem, MenuItemProps, useTheme } from '@mui/material'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { WithChildren } from '@xylabs/react-shared'
import { EllipsizeBox } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

export interface AddressMenuItemRendererProps extends WithChildren, MenuItemProps {
  address?: string
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
}

export const AddressMenuItemRenderer = forwardRef<HTMLLIElement, AddressMenuItemRendererProps>(
  ({ address, children, iconOnly, iconSize = 24, icons, ...props }, ref) => {
    const theme = useTheme()
    return (
      <MenuItem ref={ref} {...props}>
        <FlexRow justifyContent="flex-start" gap={1}>
          {icons ? (
            <FlexRow>
              <Identicon size={iconSize} value={address} />
            </FlexRow>
          ) : null}
          {iconOnly ? null : (
            <EllipsizeBox ellipsisPosition={'end'} width="100%" typographyProps={{ fontSize: theme.typography.body1.fontSize }}>
              {address}
            </EllipsizeBox>
          )}
          {children}
        </FlexRow>
      </MenuItem>
    )
  },
)

AddressMenuItemRenderer.displayName = 'AddressMenuItemRenderer'
