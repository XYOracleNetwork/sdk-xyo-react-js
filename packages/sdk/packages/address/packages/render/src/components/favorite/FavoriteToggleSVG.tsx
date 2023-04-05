import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'

export const FavoriteToggleSVG: React.FC<{ favorite?: boolean }> = ({ favorite }) => (
  <>
    {favorite ? (
      <StarIcon className="favorite-icon" component={'svg'} color="secondary" fontSize="small" />
    ) : (
      <StarBorderIcon className="favorite-icon" fontSize="small" />
    )}
  </>
)
