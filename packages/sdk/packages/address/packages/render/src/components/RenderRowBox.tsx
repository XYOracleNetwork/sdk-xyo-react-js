import { ListItemIcon, useTheme } from '@mui/material'
import type { FlexBoxProps } from '@xylabs/react-flexbox'
import { FlexRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { useEvent } from '@xyo-network/react-event'
import { EllipsizeBox, useShareForwardedRef } from '@xyo-network/react-shared'
import React from 'react'

import { FavoriteIconButton } from './favorite/index.ts'

export interface AddressRenderRowBoxProps extends FlexBoxProps {
  address?: string | null
  disableSharedRef?: boolean
  favorite?: boolean
  iconOnly?: boolean
  iconSize?: number
  icons?: boolean
  name?: string
  showFavorite?: boolean
}

export const AddressRenderRowBox = (
  {
    ref, address, children, disableSharedRef, favorite: favoriteProp = false, iconOnly, iconSize = 24, icons, name, showFavorite = false, ...props
  }: AddressRenderRowBoxProps & { ref?: React.RefObject<HTMLElement | null> },
) => {
  const theme = useTheme()

  const sharedRef = useShareForwardedRef(ref)
  const [elementRef, dispatch] = useEvent(undefined, sharedRef)

  return (
    <FlexRow
      gap={2}
      justifyContent="flex-start"
      ref={elementRef}
      onClick={() => {
        if (address) {
          dispatch('address', 'click', address)
        }
      }}
      {...props}
    >
      {icons && address
        ? (
            <ListItemIcon sx={{ minWidth: 0 }}>
              <Identicon size={iconSize} value={address} />
            </ListItemIcon>
          )
        : null}
      {iconOnly
        ? null
        : (
            <EllipsizeBox
              disableSharedRef={disableSharedRef}
              ellipsisPosition="end"
              width="100%"
              typographyProps={{ fontSize: theme.typography.body1.fontSize }}
            >
              {name ?? address}
            </EllipsizeBox>
          )}
      {children}
      {showFavorite && address
        ? <FavoriteIconButton name={name} size="small" value={address} valueType="address" favorite={favoriteProp} />
        : null}
    </FlexRow>
  )
}

AddressRenderRowBox.displayName = 'AddressRenderRowBox'
