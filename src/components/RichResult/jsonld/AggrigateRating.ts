/* eslint-disable import/no-cycle */
import Rating from './Rating'
import Thing from './Thing'

interface AggregateRating extends Rating {
  itemReviewed?: Thing
  ratingCount?: number
  reviewCount?: number
}

export default AggregateRating
