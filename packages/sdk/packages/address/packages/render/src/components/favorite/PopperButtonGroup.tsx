import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import { Button, ButtonGroup, ButtonGroupProps } from '@mui/material'

export interface FavoritePopperProps extends ButtonGroupProps {
  alias?: string
  favorite?: boolean
  onConfirmFavorite?: (alias?: string, newFavoriteState?: boolean) => void
}

export const PopperButtonGroup: React.FC<FavoritePopperProps> = ({ alias, onConfirmFavorite, favorite, ...props }) => {
  return (
    <ButtonGroup {...props}>
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
  )
}
