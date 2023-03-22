import StarIcon from '@mui/icons-material/Star'
import { Button, Card, CardContent, ClickAwayListener, Fade, Popper, PopperProps, TextField } from '@mui/material'
import { RefObject, useState } from 'react'

import { popperId } from './lib'

export interface FavoritePopperProps extends PopperProps {
  favoriteRef?: RefObject<HTMLElement>
  onClickAway?: (event: MouseEvent | TouchEvent) => void
  onConfirmFavorite?: (alias?: string) => void
}
export const FavoritePopper: React.FC<FavoritePopperProps> = ({
  favoriteRef,
  onClickAway = () => {
    return
  },
  onConfirmFavorite,
  ...props
}) => {
  const [alias, setAlias] = useState<string>('')

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
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={(e) => {
                    e.stopPropagation()
                    onConfirmFavorite?.(alias)
                  }}
                >
                  <StarIcon />
                </Button>
              </CardContent>
            </Card>
          </Fade>
        )}
      </Popper>
    </ClickAwayListener>
  )
}
