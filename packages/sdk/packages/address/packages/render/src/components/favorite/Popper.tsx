import { Card, CardContent, ClickAwayListener, Fade, Popper, PopperProps, styled, TextField } from '@mui/material'
import React, { forwardRef, RefObject, useEffect, useState } from 'react'

import { popperId } from './lib/index.js'
import { PopperButtonGroup } from './PopperButtonGroup.js'

export interface FavoritePopperProps extends PopperProps {
  favorite?: boolean
  favoriteRef?: RefObject<HTMLElement>
  name?: string
  onClickAway?: (event: MouseEvent | TouchEvent) => void
  onConfirmFavorite?: (name?: string, newFavoriteState?: boolean) => void
}
export const FavoritePopper = forwardRef<HTMLDivElement, FavoritePopperProps>(
  (
    {
      name: nameProp,
      favorite,
      favoriteRef,
      onClickAway = () => {
        return
      },
      onConfirmFavorite,
      ...props
    },
    ref,
  ) => {
    const [name, setName] = useState(nameProp)
    useEffect(() => {
      setName(nameProp)
    }, [nameProp])

    return (
      <ClickAwayListener onClickAway={onClickAway}>
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
  },
)

FavoritePopper.displayName = 'FavoritePopper'

// Ensure the popper is over all other mui portal elements
const PopperStyled = styled(Popper, { name: 'PopperStyled' })(() => ({ zIndex: 9999 }))
