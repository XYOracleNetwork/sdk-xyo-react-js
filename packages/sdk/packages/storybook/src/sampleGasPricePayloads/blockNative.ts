export const sampleBlockNativeGasPricePayload = {
  blockPrices: [
    {
      baseFeePerGas: 26.32847478,
      blockNumber: 16134624,
      estimatedPrices: [
        {
          confidence: 99,
          maxFeePerGas: 41.86,
          maxPriorityFeePerGas: 1.18,
          price: 27,
        },
        {
          confidence: 95,
          maxFeePerGas: 41.54,
          maxPriorityFeePerGas: 0.86,
          price: 27,
        },
        {
          confidence: 90,
          maxFeePerGas: 41.15,
          maxPriorityFeePerGas: 0.47,
          price: 26,
        },
        {
          confidence: 80,
          maxFeePerGas: 41,
          maxPriorityFeePerGas: 0.32,
          price: 26,
        },
        {
          confidence: 70,
          maxFeePerGas: 40.93,
          maxPriorityFeePerGas: 0.25,
          price: 26,
        },
      ],
      estimatedTransactionCount: 186,
    },
  ],
  currentBlockNumber: 16134623,
  estimatedBaseFees: [
    {
      'pending+1': [
        {
          baseFee: 29.62,
          confidence: 99,
        },
      ],
    },
    {
      'pending+2': [
        {
          baseFee: 33.33,
          confidence: 99,
        },
      ],
    },
    {
      'pending+3': [
        {
          baseFee: 37.4,
          confidence: 99,
        },
      ],
    },
    {
      'pending+4': [
        {
          baseFee: 39.26,
          confidence: 99,
        },
      ],
    },
    {
      'pending+5': [
        {
          baseFee: 40.68,
          confidence: 99,
        },
      ],
    },
  ],
  maxPrice: 64,
  msSinceLastBlock: 9645,
  network: 'main',
  schema: 'network.xyo.blockchain.ethereum.gas.blocknative',
  system: 'ethereum',
  timestamp: 1670437800246,
  unit: 'gwei',
}
