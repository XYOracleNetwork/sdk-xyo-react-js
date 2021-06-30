/* eslint-disable import/no-cycle */
import AdministrativeArea from './AdministrativeArea'
import AggregateRating from './AggrigateRating'
import Article from './Article'
import Brand from './Brand'
import ContactPoint from './ContactPoint'
import CreativeWork from './CreativeWork'
import DateTime from './DateTime'
import GeoShape from './GeoShape'
import Language from './Language'
import Offer from './Offer'
import Person from './Person'
import Place from './Place'
import PostalAddress from './PostalAddress'
import Product from './Product'
import QuantitativeValue from './QuantitativeValue'
import Review from './Review'
import Text from './Text'
import Thing from './Thing'
import VirtualLocation from './VirtualLocation'

//TODO: Resolve Anys
interface Organization extends Thing {
  actionableFeedbackPolicy?: CreativeWork | URL
  address?: PostalAddress | Text
  aggregateRating?: AggregateRating
  alumni?: Person
  areaServed?: AdministrativeArea | GeoShape | Place | Text
  award?: Text
  brand?: Brand
  contactPoint?: ContactPoint
  correctionsPolicy?: CreativeWork | URL
  department?: Organization
  dissolutionDate?: DateTime
  diversityPolicy?: CreativeWork | URL
  diversityStaffingReport?: Article | URL
  duns?: Text
  email?: Text
  employee?: Person | Person[]
  ethicsPolicy?: CreativeWork | URL
  event?: Event
  faxNumber?: Text
  founder?: Person | Text
  foundingDate?: DateTime
  foundingLocation?: Place
  funder?: Organization | Person
  globalLocationNumber?: Text
  hasCredential?: unknown
  hasMerchantReturnPolicy?: unknown
  hasOfferCatalog?: unknown
  hasPOS?: Place
  interactionStatistic?: unknown
  isicV4?: Text
  knowsAbout?: Text | Thing | URL
  knowsLanguage?: Language | Text
  legalName?: Text
  location?: Place | PostalAddress | Text | VirtualLocation
  logo?: unknown
  makesOffer?: Offer
  member?: Organization | Person
  memberOf?: Organization | unknown
  naics?: Text
  nonprofitStatus?: unknown
  numberOfEmployees?: QuantitativeValue
  ownershipFundingInfo?: unknown | CreativeWork | Text | URL
  owns?: unknown | Product
  parentOrganization?: Organization
  publishingPrinciples?: CreativeWork | URL
  review?: Review
  seeks?: unknown
  slogan?: Text
  sponsor?: Organization | Person
  subOrganization?: Organization
  taxID?: Text
  telephone?: Text
  unnamedSourcesPolicy?: CreativeWork | URL
  vatID?: Text
}

export default Organization
