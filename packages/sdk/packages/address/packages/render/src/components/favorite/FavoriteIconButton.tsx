import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton, IconButtonProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { popperId } from './lib'
import { FavoritePopper } from './Popper'

export interface FavoriteEvent {
  address?: string
  alias?: string
  favorite: boolean
}

export interface FavoriteIconButtonProps extends WithChildren, IconButtonProps {
  // TODO - this could be anything really
  address?: string
  favorite?: boolean
}

export const FavoriteIconButton = forwardRef<HTMLButtonElement, FavoriteIconButtonProps>(
  ({ address, children, favorite: favoriteProp, ...props }, ref) => {
    const [favorite, setFavorite] = useState(favoriteProp)
    const [openPopper, setOpenPopper] = useState(false)
    useEffect(() => {
      setFavorite(favoriteProp)
    }, [favoriteProp])

    const sharedRef = useShareForwardedRef(ref)
    const [buttonRef, dispatch] = useXyoEvent(undefined, sharedRef)
    const onConfirmFavorite = (alias?: string) => {
      setFavorite((current) => {
        const newFavoriteState = !current
        const favoriteEvent: FavoriteEvent = {
          address,
          alias,
          favorite: newFavoriteState,
        }
        dispatch('address', 'favorite', JSON.stringify(favoriteEvent))
        return newFavoriteState
      })
      setOpenPopper(false)
    }

    const starRef = useRef<HTMLSpanElement>(null)

    return (
      <IconButton
        ref={buttonRef}
        aria-describedby={popperId}
        // used to prevent parent items from rippling when IconButton is clicked
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation()
          setOpenPopper(true)
        }}
        {...props}
      >
        <span ref={starRef}>{favorite ? <StarIcon component={'svg'} color="secondary" /> : <StarBorderIcon />}</span>
        <FavoritePopper favoriteRef={starRef} open={openPopper} onConfirmFavorite={onConfirmFavorite} onClickAway={() => setOpenPopper(false)} />
        {children}
      </IconButton>
    )
  },
)

FavoriteIconButton.displayName = 'FavoriteIconButton'
