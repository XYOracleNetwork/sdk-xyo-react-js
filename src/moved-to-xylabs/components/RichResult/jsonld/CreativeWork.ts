/* eslint-disable @delagen/deprecation/deprecation */
/* eslint-disable import/no-cycle */
import AggregateRating from './AggrigateRating'
import DateTime from './DateTime'
import Integer from './Integer'
import Language from './Language'
import MediaObject from './MediaObject'
import Offer from './Offer'
import Organization from './Organization'
import Person from './Person'
import Place from './Place'
import Product from './Product'
import QuantitativeValue from './QuantitativeValue'
import Rating from './Rating'
import Review from './Review'
import Text from './Text'
import Thing from './Thing'
import URL from './URL'

//TODO: Resolve Anys
interface CreativeWork extends Thing {
  about?: Thing
  abstract?: Text
  accessMode?: Text
  accessModeSufficient?: unknown
  accessibilityAPI?: Text
  accessibilityControl?: Text
  accessibilityFeature?: Text
  accessibilityHazard?: Text
  accessibilitySummary?: Text
  accountablePerson?: Person
  acquireLicensePage?: CreativeWork | URL
  aggregateRating?: AggregateRating
  alternativeHeading?: Text
  assesses?: unknown | Text
  associatedMedia?: MediaObject
  audience?: unknown
  audio?: unknown | unknown | unknown
  author?: Organization | Person
  award?: Text
  character?: Person
  citation?: CreativeWork | Text
  comment?: unknown
  commentCount?: Integer
  conditionsOfAccess?: Text
  contentLocation?: Place
  contentRating?: Rating | Text
  contentReferenceTime?: DateTime
  contributor?: Organization | Person
  copyrightHolder?: Organization | Person
  copyrightNotice?: Text
  copyrightYear?: number
  correction?: unknown | Text | URL
  creativeWorkStatus?: unknown | Text
  creator?: Organization | Person
  creditText?: Text
  dateCreated?: DateTime
  dateModified?: DateTime
  datePublished?: DateTime
  discussionUrl?: URL
  editEIDR?: Text | URL
  editor?: Person
  educationalAlignment?: unknown
  educationalLevel?: unknown | Text | URL
  educationalUse?: unknown | Text
  encoding?: MediaObject
  encodingFormat?: Text | URL
  exampleOfWork?: CreativeWork
  expires?: DateTime
  funder?: Organization | Person
  genre?: Text | URL
  hasPart?: CreativeWork
  headline?: Text
  inLanguage?: Language | Text
  interactionStatistic?: unknown
  interactiveityType?: Text
  isAccessibleForFree?: boolean
  isBasedOn?: CreativeWork | Product | URL
  isFamilyFriendly?: boolean
  isPartOf?: CreativeWork | URL
  keywords?: unknown | Text | URL
  learningResourceType?: unknown | Text
  license?: CreativeWork | URL
  locationCreated?: Place
  mainEntry?: Thing
  maintainer?: Organization | Person
  material?: Product | Text | URL
  materialExtent?: QuantitativeValue | Text
  mentions?: Thing
  offers?: unknown | Offer[]
  pattern?: unknown | Text
  position?: Integer | Text
  producer?: Organization | Person
  provider?: Organization | Person
  publication?: unknown
  publisher?: Organization | Person
  publisherImprint?: Organization
  publishingPrinciples?: CreativeWork | URL
  recordedAt?: Event
  releasedEvent?: unknown
  review?: Review
  schemaVersion?: Text | URL
  sdDatePublished?: DateTime
  sdLicense?: CreativeWork | URL
  sdPublisher?: Organization | Person
  size?: unknown | QuantitativeValue | Text
  sourceOrganization?: Organization
  spatial?: Place
  spatialCoverage?: Place
  sponsor?: Organization | Person
  teaches?: unknown | Text
  temporal?: DateTime | Text
  temporalCoverage?: DateTime | Text | URL
  text?: Text
  thumbnailUrl?: URL
  timeRequired?: unknown
  translationOfWork?: CreativeWork
  translator?: Organization | Person
  typicalAgeRange?: Text
  usageInfo?: CreativeWork | URL
  version?: number | Text
  video?: unknown
  workExample?: CreativeWork
  workTranslation?: CreativeWork
}

export default CreativeWork
