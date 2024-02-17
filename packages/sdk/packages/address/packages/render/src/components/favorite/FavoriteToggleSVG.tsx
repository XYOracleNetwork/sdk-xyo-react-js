import { Star as StarIcon, StarBorder as StarBorderIcon } from '@mui/icons-material'

export const FavoriteToggleSVG: React.FC<{ favorite?: boolean }> = ({ favorite }) => (
  <>
    {favorite ?
      <StarIcon className="favorite-icon" component={'svg'} color="secondary" fontSize="small" />
    : <StarBorderIcon className="favorite-icon" fontSize="small" />}
  </>
)
