import { IconButton, IconButtonProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { FavoriteItemEvent, generateFavoriteEvent } from '../lib'
import { FavoriteToggleSVG } from './FavoriteToggleSVG'
import { popperId } from './lib'
import { FavoritePopper } from './Popper'

export interface FavoriteIconButtonProps extends WithChildren, IconButtonProps {
  favorite?: FavoriteItemEvent['favorite']
  name?: FavoriteItemEvent['name']
  value?: string
  valueType?: FavoriteItemEvent['favoriteType']
}

export const FavoriteIconButton = forwardRef<HTMLButtonElement, FavoriteIconButtonProps>(
  ({ children, favorite: favoriteProp, name, valueType, value, ...props }, ref) => {
    const [openPopper, setOpenPopper] = useState(false)

    const [favorite, setFavorite] = useState(favoriteProp)
    useEffect(() => {
      setFavorite(favoriteProp)
    }, [favoriteProp])

    const sharedRef = useShareForwardedRef(ref)
    const [buttonRef, dispatch] = useXyoEvent(undefined, sharedRef)

    const onConfirmFavorite = (name?: string, newFavoriteState?: boolean) => {
      const favoriteEvent = generateFavoriteEvent(!!newFavoriteState, valueType, value, name)
      dispatch('address', 'favorite', JSON.stringify(favoriteEvent))
      setFavorite(newFavoriteState)
      setOpenPopper(false)
    }

    const starRef = useRef<HTMLSpanElement>(null)

    return (
      <IconButton
        aria-describedby={popperId}
        ref={buttonRef}
        onClick={(event) => {
          event.stopPropagation()
          setOpenPopper(!openPopper)
        }}
        onMouseDown={(e) => e.stopPropagation()}
        {...props}
      >
        <span ref={starRef}>
          <FavoriteToggleSVG favorite={favorite} />
        </span>
        <FavoritePopper
          sx={{ zIndex: 1301 }}
          name={name}
          favorite={favorite}
          favoriteRef={starRef}
          open={openPopper}
          onConfirmFavorite={onConfirmFavorite}
          onClickAway={() => setOpenPopper(false)}
        />
        {children}
      </IconButton>
    )
  },
)

FavoriteIconButton.displayName = 'FavoriteIconButton'
