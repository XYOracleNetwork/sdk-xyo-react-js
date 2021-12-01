/* eslint-disable @delagen/deprecation/deprecation */
/* eslint-disable import/no-cycle */
import Rating from './Rating'
import Thing from './Thing'

/** @deprecated Moved to @xylabs/sdk-react */
interface AggregateRating extends Rating {
  itemReviewed?: Thing
  ratingCount?: number
  reviewCount?: number
}

export default AggregateRating
