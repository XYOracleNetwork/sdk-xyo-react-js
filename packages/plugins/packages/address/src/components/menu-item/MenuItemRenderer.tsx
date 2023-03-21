import { Alert, CircularProgress, MenuItem, MenuItemProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { AddressRenderRowBox, AddressRenderRowBoxPropsBase } from '@xyo-network/react-address-render'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useMemo } from 'react'

export interface AddressMenuItemRendererProps extends WithChildren, AddressRenderRowBoxPropsBase, MenuItemProps {
  AddressNullComponent?: React.ReactNode
  AddressUndefinedComponent?: React.ReactNode
  address?: string | null
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
    const AddressNull = useMemo(() => AddressNullComponent ?? <Alert severity="error">Missing Address</Alert>, [AddressNullComponent])
    const AddressUndefined = useMemo(() => AddressUndefinedComponent ?? <CircularProgress size={16} />, [AddressUndefinedComponent])

    return (
      <>
        {address ? (
          <MenuItem ref={ref} {...props}>
            <AddressRenderRowBox
              address={address}
              favorite={favoriteProp}
              iconOnly={iconOnly}
              iconSize={iconSize}
              icons={icons}
              showFavorite={showFavorite}
            />
            {children}
          </MenuItem>
        ) : null}
        {address === null ? AddressNull : null}
        {address === undefined ? AddressUndefined : null}
      </>
    )
  },
)

AddressMenuItemRenderer.displayName = 'AddressMenuItemRenderer'
