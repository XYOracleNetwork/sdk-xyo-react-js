import { ListItemIcon, ListItemText, useTheme } from '@mui/material'
import { FlexBoxProps, FlexGrowRow } from '@xylabs/react-flexbox'
import { Identicon } from '@xylabs/react-identicon'
import { WithChildren } from '@xylabs/react-shared'
import { EllipsizeBox } from '@xyo-network/react-shared'
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

    return (
      <FlexGrowRow justifyContent="flex-start" gap={1} ref={ref} {...props}>
        {icons && address ? (
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
        {showFavorite && address ? <FavoriteIconButton address={address} favorite={favoriteProp} /> : null}
        {children}
      </FlexGrowRow>
    )
  },
)

AddressRenderRowBox.displayName = 'AddressRenderRowBox'
