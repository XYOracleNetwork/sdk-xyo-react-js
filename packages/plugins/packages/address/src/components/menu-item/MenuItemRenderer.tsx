import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { Alert, CircularProgress, IconButton, ListItemIcon, ListItemText, MenuItem, MenuItemProps, useTheme } from '@mui/material'
import { FlexGrowRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { EllipsizeBox, useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useEffect, useMemo, useState } from 'react'

export interface FavoriteEvent {
  address: string
  favorite: boolean
}

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

    const [favorite, setFavorite] = useState(favoriteProp)
    useEffect(() => {
      setFavorite(favoriteProp)
    }, [favoriteProp])

    const sharedRef = useShareForwardedRef(ref)
    const [liRef, dispatch] = useXyoEvent(undefined, sharedRef)

    return (
      <>
        {address ? (
          <MenuItem disableGutters ref={liRef} onClick={() => dispatch('address', 'click', address)} {...props}>
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
              {showFavorite ? (
                <IconButton
                  // used to prevent parent items from rippling when IconButton is clicked
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation()
                    setFavorite((current) => {
                      const newFavoriteState = !current
                      const favoriteEvent: FavoriteEvent = {
                        address,
                        favorite: newFavoriteState,
                      }
                      dispatch('address', 'favorite', JSON.stringify(favoriteEvent))
                      return newFavoriteState
                    })
                  }}
                >
                  {favorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              ) : null}
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
