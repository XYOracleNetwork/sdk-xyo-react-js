/* eslint-disable import/no-cycle */
import Intangible from './Intangible'
import Text from './Text'

interface Rating extends Intangible {
  bestRating?: number
  ratingExplaination?: Text
  ratingValue?: number
  reviewAspect?: Text
  worstRating?: number
}

export default Rating
