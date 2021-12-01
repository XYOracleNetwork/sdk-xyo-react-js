enum ItemAvailability {
  /** Indicates that the item has been discontinued. */
  Discontinued = 'https://schema.org/Discontinued',
  /** Indicates that the item is in stock. */
  InStock = 'https://schema.org/InStock',
  /** Indicates that the item is available only at physical locations. */
  InStoreOnly = 'https://schema.org/InStoreOnly',
  /** Indicates that the item has limited availability. */
  LimitedAvailability = 'https://schema.org/LimitedAvailability',
  /** Indicates that the item is available only online. */
  OnlineOnly = 'https://schema.org/OnlineOnly',
  /** Indicates that the item is out of stock. */
  OutOfStock = 'https://schema.org/OutOfStock',
  /** Indicates that the item is available for pre-order. */
  PreOrder = 'https://schema.org/PreOrder',
  /** Indicates that the item is available for ordering and delivery before general availability. */
  PreSale = 'https://schema.org/PreSale',
  /** Indicates that the item has sold out. */
  SoldOut = 'https://schema.org/SoldOut',
}

export default ItemAvailability
