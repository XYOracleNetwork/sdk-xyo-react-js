import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton, IconButtonProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useEffect, useState } from 'react'

export interface FavoriteEvent {
  address?: string
  favorite: boolean
}

export interface FavoriteIconButtonProps extends WithChildren, IconButtonProps {
  address?: string
  favorite?: boolean
}

export const FavoriteIconButton = forwardRef<HTMLButtonElement, FavoriteIconButtonProps>(
  ({ address, children, favorite: favoriteProp, ...props }, ref) => {
    const [favorite, setFavorite] = useState(favoriteProp)
    useEffect(() => {
      setFavorite(favoriteProp)
    }, [favoriteProp])

    const sharedRef = useShareForwardedRef(ref)
    const [buttonRef, dispatch] = useXyoEvent(undefined, sharedRef)

    return (
      <IconButton
        ref={buttonRef}
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
        {...props}
      >
        {favorite ? <StarIcon color="secondary" /> : <StarBorderIcon />}
        {children}
      </IconButton>
    )
  },
)

FavoriteIconButton.displayName = 'FavoriteIconButton'
