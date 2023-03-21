import { MenuItem, MenuItemProps } from '@mui/material'
import { EthAddress } from '@xylabs/eth-address'
import { EthAccountBox } from '@xylabs/react-crypto'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { WithChildren } from '@xylabs/react-shared'
import { forwardRef } from 'react'

export interface AddressMenuItemRendererProps extends WithChildren, MenuItemProps {
  address?: string
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
}

export const AddressMenuItemRenderer = forwardRef<HTMLLIElement, AddressMenuItemRendererProps>(
  ({ address, children, iconOnly, iconSize, icons, ...props }, ref) => {
    return (
      <MenuItem ref={ref} {...props}>
        <FlexRow justifyContent="flex-start" gap={1}>
          {icons ? (
            <FlexRow>
              <Identicon size={iconSize} value={address} />
            </FlexRow>
          ) : null}
          <EthAccountBox alignItems="stretch" iconOnly={iconOnly} address={EthAddress.fromString(address)} />
          {children}
        </FlexRow>
      </MenuItem>
    )
  },
)

AddressMenuItemRenderer.displayName = 'AddressMenuItemRenderer'
