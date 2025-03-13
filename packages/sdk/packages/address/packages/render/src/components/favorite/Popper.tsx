import type { PopperProps } from '@mui/material'
import {
  Card, CardContent, ClickAwayListener, Fade, Popper, styled, TextField,
} from '@mui/material'
import type { RefObject } from 'react'
import React, { useState } from 'react'

import { popperId } from './lib/index.ts'
import { PopperButtonGroup } from './PopperButtonGroup.tsx'

export interface FavoritePopperProps extends PopperProps {
  favorite?: boolean
  favoriteRef?: RefObject<HTMLElement | null>
  name?: string
  onClickAway?: (event: MouseEvent | TouchEvent) => void
  onConfirmFavorite?: (name?: string, newFavoriteState?: boolean) => void
}
export const FavoritePopper = (
  {
    ref, name: nameProp, favorite, favoriteRef, onClickAway, onConfirmFavorite, ...props
  }: FavoritePopperProps & { ref?: React.RefObject<HTMLDivElement | null> },
) => {
  const [name, setName] = useState(() => nameProp)

  return (
    <ClickAwayListener onClickAway={onClickAway ?? (() => null)}>
      <PopperStyled
        id={popperId}
        anchorEl={favoriteRef?.current}
        onClick={e => e.stopPropagation()}
        onTouchStart={e => e.stopPropagation()}
        transition
        ref={ref}
        {...props}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              <CardContent sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  autoFocus
                  label="Favorite Name"
                  placeholder="optional"
                  size="small"
                  value={name ?? ''}
                  onChange={e => setName(e.target.value)}
                />
                <PopperButtonGroup favorite={favorite} onConfirmFavorite={onConfirmFavorite} name={name} />
              </CardContent>
            </Card>
          </Fade>
        )}
      </PopperStyled>
    </ClickAwayListener>
  )
}

FavoritePopper.displayName = 'FavoritePopper'

// Ensure the popper is over all other mui portal elements
const PopperStyled = styled(Popper, { name: 'PopperStyled' })(() => ({ zIndex: 9999 }))
