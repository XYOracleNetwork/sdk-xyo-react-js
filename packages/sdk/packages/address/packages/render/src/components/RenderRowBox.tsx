import { ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { FlexBoxProps, FlexGrowRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { EllipsizeBox, useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef } from 'react'

import { FavoriteIconButton } from './favorite'

export interface AddressRenderRowBoxPropsBase {
  address?: string | null
  favorite?: boolean
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  showFavorite?: boolean
}

export interface AddressRenderRowBoxProps extends WithChildren, AddressRenderRowBoxPropsBase, FlexBoxProps {}

export const AddressRenderRowBox = forwardRef<HTMLElement, AddressRenderRowBoxProps>(
  ({ address, children, favorite: favoriteProp = false, iconOnly, iconSize = 24, icons, showFavorite = false, ...props }, ref) => {
    const theme = useTheme()

    const sharedRef = useShareForwardedRef(ref)
    const [elementRef, dispatch] = useXyoEvent(undefined, sharedRef)

    return (
      <FlexGrowRow
        gap={2}
        justifyContent="flex-start"
        ref={elementRef}
        onClick={() => (address ? dispatch('address', 'click', address) : undefined)}
        {...props}
      >
        {icons && address ? (
          <ListItemIcon sx={{ minWidth: 0 }}>
            <Identicon size={iconSize} value={address} />
          </ListItemIcon>
        ) : null}
        {iconOnly ? null : (
          <ListItemText>
            <EllipsizeBox ellipsisPosition={'end'} width="100%" typographyProps={{ fontSize: theme.typography.body1.fontSize }}>
              {address}
            </EllipsizeBox>
          </ListItemText>
        )}
        {children}
        {showFavorite && address ? <FavoriteIconButton size={'small'} address={address} favorite={favoriteProp} /> : null}
      </FlexGrowRow>
    )
  },
)

AddressRenderRowBox.displayName = 'AddressRenderRowBox'
