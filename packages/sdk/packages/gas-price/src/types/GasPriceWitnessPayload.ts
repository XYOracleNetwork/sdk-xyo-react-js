// Payload for common fields across Gas Price Witnesses
export interface GasPriceWitnessUIBasePayload {
  baseFee?: UIField
  blockNumber?: UIField
  gasPrice?: GasPrice[]
  schema?: string
  timestamp?: number
  // @field website for the company
  website?: string
}

export interface GasPrice {
  price?: UIField
  priorityFee?: UIField
}

export interface UIField {
  label?: string
  value?: number
}
