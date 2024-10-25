import type { IconButtonProps } from '@mui/material'
import { IconButton, styled } from '@mui/material'
import { useResetState } from '@xylabs/react-hooks'
import { useEvent } from '@xyo-network/react-event'
import { useShareForwardedRef } from '@xyo-network/react-shared'
import type { PropsWithChildren } from 'react'
import React, {
  forwardRef, useRef, useState,
} from 'react'

import type { FavoriteItemEvent } from '../lib/index.ts'
import { generateFavoriteEvent } from '../lib/index.ts'
import { FavoriteToggleSVG } from './FavoriteToggleSVG.tsx'
import { popperId } from './lib/index.ts'
import { FavoritePopper } from './Popper.tsx'

export interface FavoriteIconButtonProps extends PropsWithChildren, IconButtonProps {
  favorite?: FavoriteItemEvent['favorite']
  name?: FavoriteItemEvent['name']
  value?: string
  valueType?: FavoriteItemEvent['favoriteType']
}

export const FavoriteIconButton = forwardRef<HTMLButtonElement, FavoriteIconButtonProps>(
  ({
    children, favorite: favoriteProp, name, valueType, value, ...props
  }, ref) => {
    const [openPopper, setOpenPopper] = useState(false)

    const [favorite, setFavorite] = useResetState(favoriteProp)

    const sharedRef = useShareForwardedRef(ref)
    const [buttonRef, dispatch] = useEvent(undefined, sharedRef)

    const onConfirmFavorite = (name?: string, newFavoriteState?: boolean) => {
      const favoriteEvent = generateFavoriteEvent(!!newFavoriteState, valueType, value, name)
      dispatch('address', 'favorite', JSON.stringify(favoriteEvent))
      setFavorite(newFavoriteState)
      setOpenPopper(false)
    }

    const starRef = useRef<HTMLSpanElement>(null)

    return (
      <IconButtonCondensed
        aria-describedby={popperId}
        ref={buttonRef}
        onClick={(event) => {
          event.stopPropagation()
          setOpenPopper(!openPopper)
        }}
        onTouchStart={(event) => {
          event.stopPropagation()
          setOpenPopper(!openPopper)
        }}
        onMouseDown={e => e.stopPropagation()}
        sx={{ lineHeight: 0, p: 0.25 }}
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
      </IconButtonCondensed>
    )
  },
)

FavoriteIconButton.displayName = 'FavoriteIconButton'

const IconButtonCondensed = styled(IconButton, { name: 'IconButtonCondensed' })(({ theme }) => ({
  lineHeight: 0,
  padding: theme.spacing(0.25),
}))
