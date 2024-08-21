import { Delete as DeleteIcon, Star as StarIcon } from '@mui/icons-material'
import type { ButtonGroupProps } from '@mui/material'
import { Button, ButtonGroup } from '@mui/material'
import React from 'react'

export interface FavoritePopperProps extends ButtonGroupProps {
  favorite?: boolean
  name?: string
  onConfirmFavorite?: (name?: string, newFavoriteState?: boolean) => void
}

export const PopperButtonGroup: React.FC<FavoritePopperProps> = ({
  name, onConfirmFavorite, favorite, ...props
}) => {
  return (
    <ButtonGroup {...props}>
      <Button
        title="Save Favorite"
        variant="contained"
        onClick={(e) => {
          e.stopPropagation()
          onConfirmFavorite?.(name, true)
        }}
      >
        <StarIcon />
      </Button>
      {favorite
        ? (
            <Button
              title="Remove Favorite"
              variant="contained"
              onClick={(e) => {
                e.stopPropagation()
                onConfirmFavorite?.(name, false)
              }}
            >
              <DeleteIcon />
            </Button>
          )
        : null}
    </ButtonGroup>
  )
}
