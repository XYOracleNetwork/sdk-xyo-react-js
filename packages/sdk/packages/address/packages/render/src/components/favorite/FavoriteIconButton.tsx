import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import { IconButton, IconButtonProps } from '@mui/material'
import { WithChildren } from '@xylabs/react-shared'
import { useXyoEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { FavoriteItemEvent } from '../lib'
import { popperId } from './lib'
import { FavoritePopper } from './Popper'

export interface FavoriteIconButtonProps extends WithChildren, IconButtonProps {
  alias?: FavoriteItemEvent['alias']
  favorite?: FavoriteItemEvent['favorite']
  value?: string
  valueType?: FavoriteItemEvent['favoriteType']
}

export const FavoriteIconButton = forwardRef<HTMLButtonElement, FavoriteIconButtonProps>(
  ({ alias, children, favorite: favoriteProp, valueType, value, ...props }, ref) => {
    const [openPopper, setOpenPopper] = useState(false)

    const [favorite, setFavorite] = useState(favoriteProp)
    useEffect(() => {
      setFavorite(favoriteProp)
    }, [favoriteProp])

    const sharedRef = useShareForwardedRef(ref)
    const [buttonRef, dispatch] = useXyoEvent(undefined, sharedRef)
    const onConfirmFavorite = (alias?: string, newFavoriteState?: boolean) => {
      setFavorite(() => {
        const favoriteEvent: FavoriteItemEvent = {
          alias,
          favorite: !!newFavoriteState,
          favoriteType: valueType,
          favoriteValue: value,
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
        <FavoritePopper
          alias={alias}
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
