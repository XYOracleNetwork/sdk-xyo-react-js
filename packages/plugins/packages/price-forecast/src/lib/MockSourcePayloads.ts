export const MockSourcePayloads = () => {
  const tenMin = 600_000
  return [
    {
      baseFee: 38.901_553_878_25,
      feePerGas: {
        high: 47.994_586_439_6, low: 39.006_868_093, medium: 39.306_868_093, veryHigh: 44.453_843_805_25,
      },
      priorityFeePerGas: {
        high: 1.026_666_666_666_666_6, low: -0.410_000_000_000_000_03, medium: 0.38, veryHigh: 1.390_000_000_000_000_1,
      },
      schema: 'network.xyo.blockchain.ethereum.gas',
      timestamp: Date.now() - tenMin,
    },
    {
      baseFee: 38.901_553_878_25,
      feePerGas: {
        high: 47.994_586_439_6, low: 39.006_868_093, medium: 100, veryHigh: 44.453_843_805_25,
      },
      priorityFeePerGas: {
        high: 1.026_666_666_666_666_6, low: -0.410_000_000_000_000_03, medium: 0.38, veryHigh: 1.390_000_000_000_000_1,
      },
      schema: 'network.xyo.blockchain.ethereum.gas',
      timestamp: Date.now(),
    },
  ]
}
