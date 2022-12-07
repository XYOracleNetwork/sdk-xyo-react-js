// Payload for common fields across Gas Price Witnesses
export interface GasPriceWitnessUIBasePayload {
  // @field website for the company
  website?: string
  timestamp?: number
  schema?: string
  blockNumber?: UIField
  gasPrice: GasPrice[]
  baseFee?: UIField
}

interface GasPrice {
  price?: UIField
  priorityFee?: UIField
}

interface UIField {
  label?: string
  value?: number
}
