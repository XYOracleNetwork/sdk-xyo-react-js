/* eslint-disable import/no-cycle */
import CreativeWork from './CreativeWork'
import Rating from './Rating'
import Thing from './Thing'

interface Review extends CreativeWork {
  itemReviewed?: Thing
  reviewAspect?: Text
  reviewBody?: Text
  reviewRating?: Rating
}

export default Review
