import { Alert, CircularProgress, ListItemIcon, ListItemText, MenuItem, MenuItemProps, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { EllipsizeBox, useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useMemo } from 'react'

import { FavoriteIconButton } from './favorite'

export interface AddressMenuItemRendererProps extends WithChildren, MenuItemProps {
  AddressNullComponent?: React.ReactNode
  AddressUndefinedComponent?: React.ReactNode
  address?: string | null
  favorite?: boolean
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  showFavorite?: boolean
}

export const AddressMenuItemRenderer = forwardRef<HTMLLIElement, AddressMenuItemRendererProps>(
  (
    {
      AddressNullComponent,
      AddressUndefinedComponent,
      address,
      children,
      favorite: favoriteProp = false,
      iconOnly,
      iconSize = 24,
      icons,
      showFavorite = false,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme()
    const AddressNull = useMemo(() => AddressNullComponent ?? <Alert severity="error">Missing Address</Alert>, [AddressNullComponent])
    const AddressUndefined = useMemo(() => AddressUndefinedComponent ?? <CircularProgress size={16} />, [AddressUndefinedComponent])

    const sharedRef = useShareForwardedRef(ref)
    const [liRef, dispatch] = useXyoEvent(undefined, sharedRef)

    return (
      <>
        {address ? (
          <MenuItem ref={liRef} onClick={() => dispatch('address', 'click', address)} {...props}>
            <FlexGrowRow justifyContent="flex-start" gap={1}>
              {icons ? (
                <ListItemIcon>
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
              {showFavorite ? <FavoriteIconButton address={address} favorite={favoriteProp} /> : null}
              {children}
            </FlexGrowRow>
          </MenuItem>
        ) : null}
        {address === null ? AddressNull : null}
        {address === undefined ? AddressUndefined : null}
      </>
    )
  },
)

AddressMenuItemRenderer.displayName = 'AddressMenuItemRenderer'
