/* eslint-disable import/no-cycle */
import AdministrativeArea from './AdministrativeArea'
import AggregateRating from './AggrigateRating'
import GeoShape from './GeoShape'
import ImageObject from './ImageObject'
import Intangible from './Intangible'
import Offer from './Offer'
import Organization from './Organization'
import Person from './Person'
import Place from './Place'
import Product from './Product'
import Review from './Review'
import Text from './Text'
import Thing from './Thing'
import URL from './URL'

//TODO: Resolve Anys
interface Service extends Intangible {
  aggregateRating?: AggregateRating
  areaServed?: AdministrativeArea | GeoShape | Place | Text
  audience?: unknown
  availableChannel?: unknown
  award?: Text
  brand?: unknown | Organization
  broker?: Organization | Person
  category?: unknown | Text | Thing | URL
  hasOfferCatalog?: unknown
  hoursAvailable?: unknown
  isRelatedTo?: Product | Service
  isSimilarTo?: Product | Service
  logo?: ImageObject | URL
  offers?: Offer[]
  provider?: Organization | Person
  providerMobility?: Text
  review?: Review
  serviceOutput?: Thing
  serviceType?: unknown | Text
  slogan?: Text
  termsOfService?: Text | URL
}

export default Service
