/* eslint-disable @delagen/deprecation/deprecation */
/* eslint-disable import/no-cycle */

import AggregateRating from './AggrigateRating'
import GeospatialGeometry from './GeospatialGeometry'
import ImageObject from './ImageObject'
import Integer from './Integer'
import Map from './Map'
import Photograph from './Photograph'
import PostalAddress from './PostalAddress'
import PropertyValue from './PropertyValue'
import Review from './Review'
import Text from './Text'
import Thing from './Thing'
import URL from './URL'

interface Place extends Thing, GeospatialGeometry {
  additionalProperty?: PropertyValue
  address?: PostalAddress | Text
  aggrigateRating?: AggregateRating
  amenityFeature?: unknown
  branchCode?: Text
  containedInPlace?: Place
  containsPlace?: Place
  event?: Event
  geo?: unknown
  geoLocationNumber?: Text
  hasDriveThroughService?: boolean
  hasMap?: Map | URL
  isAccessibleForFree?: boolean
  isicV4?: Text
  latitude?: number | Text
  logo?: ImageObject | URL
  longitude?: number | Text
  maximumAttendeeCapacity?: Integer
  openingHoursSpecification?: unknown
  photo?: ImageObject | Photograph
  publicAccess?: boolean
  review?: Review
  slogan?: Text
  smokingAllowed?: boolean
  specialOpeningHoursSpecification?: unknown
  telephone?: Text
  tourBookingPage?: URL
}

export default Place
