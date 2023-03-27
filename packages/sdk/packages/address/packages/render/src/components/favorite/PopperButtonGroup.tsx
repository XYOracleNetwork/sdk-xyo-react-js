import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import { Button, ButtonGroup, ButtonGroupProps } from '@mui/material'

export interface FavoritePopperProps extends ButtonGroupProps {
  favorite?: boolean
  name?: string
  onConfirmFavorite?: (name?: string, newFavoriteState?: boolean) => void
}

export const PopperButtonGroup: React.FC<FavoritePopperProps> = ({ name, onConfirmFavorite, favorite, ...props }) => {
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
      {favorite ? (
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
      ) : null}
    </ButtonGroup>
  )
}
