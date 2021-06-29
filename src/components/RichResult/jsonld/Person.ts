/* eslint-disable import/no-cycle */

import Brand from './Brand'
import ContactPoint from './ContactPoint'
import Country from './Country'
import CreativeWork from './CreativeWork'
import Language from './Language'
import Offer from './Offer'
import Organization from './Organization'
import Place from './Place'
import PostalAddress from './PostalAddress'
import Product from './Product'
import Thing from './Thing'

interface Person extends Thing {
  additionalName?: string
  address?: string | PostalAddress
  affiliation?: Organization | Organization[]
  alumniOf?: Organization | Organization[]
  award?: string | string[]
  birthDate?: string | Date
  birthPlace?: string | Place
  brand?: Brand | Organization
  callSign?: string
  children?: Person | Person[]
  colleague?: Person | string | (Person | string)[]
  contactPoint?: ContactPoint
  deathDate?: string | Date
  deathPlace?: string | Place
  duns?: string
  email?: string
  familyName?: string
  faxNumber?: string
  follows?: Person | Person[]
  funder?: Organization | Person | (Organization | Person)[]
  gender?: string
  givenName?: string
  globalLocationNumber?: string
  hasCredential?: any
  hasOccupation?: any
  hasOfferCatalog?: any
  hasPOS?: Place
  height?: any
  homeLocation?: ContactPoint | Place
  honorificPrefix?: string
  honorificSuffix?: string
  interactionStatistic?: any
  isicV4?: string
  jobTitle?: string
  knows?: Person | Person[]
  knowsAbout?: string | Thing | (string | Thing)[]
  knowsLanguage?: Language | string | (Language | string)[]
  makesOffer?: Offer | Offer[]
  memberOf?: Organization | any | (Organization | any)[]
  naics?: string
  nationality?: Country
  netWorth?: any
  owns?: Product | any | (Product | any)[]
  parent?: Person | Person[]
  performerIn?: Event | CreativeWork | string | (Event | CreativeWork | string)[]
  publishingPrinciples?: CreativeWork | string
  relatedTo?: Person | Person[]
  seeks?: any
  sibling?: Person | Person[]
  sponsor?: Organization | Person | (Organization | Person)[]
  spouse?: Person
  taxID?: string
  telephone?: string
  vatID?: string
  weight?: any
  workLocation?: ContactPoint | Place | (ContactPoint | Place)[]
  worksFor?: Organization | Organization[]
}

export default Person
