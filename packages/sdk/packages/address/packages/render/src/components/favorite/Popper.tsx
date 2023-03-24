import { Card, CardContent, ClickAwayListener, Fade, Popper, PopperProps, styled, TextField } from '@mui/material'
import { forwardRef, RefObject, useEffect, useState } from 'react'

import { popperId } from './lib'
import { PopperButtonGroup } from './PopperButtonGroup'

export interface FavoritePopperProps extends PopperProps {
  alias?: string
  favorite?: boolean
  favoriteRef?: RefObject<HTMLElement>
  onClickAway?: (event: MouseEvent | TouchEvent) => void
  onConfirmFavorite?: (alias?: string, newFavoriteState?: boolean) => void
}
export const FavoritePopper = forwardRef<HTMLDivElement, FavoritePopperProps>(
  (
    {
      alias: aliasProp,
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
    const [alias, setAlias] = useState<string>()
    useEffect(() => {
      setAlias(aliasProp)
    }, [aliasProp])

    return (
      <ClickAwayListener onClickAway={onClickAway}>
        <PopperStyled id={popperId} anchorEl={favoriteRef?.current} onClick={(e) => e.stopPropagation()} transition ref={ref} {...props}>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Card>
                <CardContent sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    autoFocus
                    label="Favorite Alias"
                    placeholder="optional"
                    size="small"
                    value={alias ?? ''}
                    onChange={(e) => setAlias(e.target.value)}
                  />
                  <PopperButtonGroup favorite={favorite} onConfirmFavorite={onConfirmFavorite} alias={alias} />
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
