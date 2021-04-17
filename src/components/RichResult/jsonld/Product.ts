/* eslint-disable import/no-cycle */
import AggregateRating from './AggrigateRating'
import Brand from './Brand'
import DateTime from './DateTime'
import ImageObject from './ImageObject'
import Offer from './Offer'
import Organization from './Organization'
import PropertyValue from './PropertyValue'
import QuantitativeValue from './QuantitativeValue'
import Review from './Review'
import Service from './Service'
import Text from './Text'
import Thing from './Thing'
import URL from './URL'

//TODO: Resolve Anys
interface Product extends Thing {
  additionalProperty?: PropertyValue
  aggregateRating?: AggregateRating
  audience?: any
  award?: Text
  brand?: Brand | Organization
  category?: any | Text | Thing | URL
  color?: Text
  depth?: any | QuantitativeValue
  gtin?: Text
  gtin12?: Text
  gtin13?: Text
  gtin14?: Text
  gtin8?: Text
  hasEnergyConsumptionDetails?: any
  hasMerchantReturnPolicy?: any
  height?: any | QuantitativeValue
  inAccessoryOrSparePartFor?: Product
  inProductGroupWithId?: Text
  isConsumableFor?: Product
  isRelatedTo?: Product | Service
  isSimilarTo?: Product | Service
  isVariantOf?: any
  itemCondition?: any
  logo?: ImageObject | URL
  manufacturer?: Organization
  material?: Product | Text | URL
  model?: any | Text
  mpn?: Text
  nsn?: Text
  offers?: Offer[]
  pattern?: any | Text
  productID?: Text
  productionDate?: DateTime
  purchaseDate?: DateTime
  review?: Review
  size?: any | QuantitativeValue | Text
  sku?: Text
  slogan?: Text
  weight?: QuantitativeValue
  width?: any | QuantitativeValue
}

export default Product
