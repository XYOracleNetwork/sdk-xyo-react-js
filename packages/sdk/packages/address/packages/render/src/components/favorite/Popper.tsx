import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import { Button, ButtonGroup, Card, CardContent, ClickAwayListener, Fade, Popper, PopperProps, TextField } from '@mui/material'
import { RefObject, useEffect, useState } from 'react'

import { popperId } from './lib'

export interface FavoritePopperProps extends PopperProps {
  alias?: string
  favorite?: boolean
  favoriteRef?: RefObject<HTMLElement>
  onClickAway?: (event: MouseEvent | TouchEvent) => void
  onConfirmFavorite?: (alias?: string, newFavoriteState?: boolean) => void
}
export const FavoritePopper: React.FC<FavoritePopperProps> = ({
  alias: aliasProp,
  favorite,
  favoriteRef,
  onClickAway = () => {
    return
  },
  onConfirmFavorite,
  ...props
}) => {
  const [alias, setAlias] = useState<string>()
  useEffect(() => {
    setAlias(aliasProp)
  }, [aliasProp])

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Popper id={popperId} anchorEl={favoriteRef?.current} transition {...props}>
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
                <ButtonGroup>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.stopPropagation()
                      onConfirmFavorite?.(alias, true)
                    }}
                  >
                    <StarIcon />
                  </Button>
                  {favorite ? (
                    <Button
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation()
                        onConfirmFavorite?.(alias, false)
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  ) : null}
                </ButtonGroup>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  )
}
