export const MockSourcePayloads = () => {
  const tenMin = 600000
  return [
    {
      baseFee: 38.90155387825,
      feePerGas: { high: 47.9945864396, low: 39.006868093, medium: 39.306868093, veryHigh: 44.45384380525 },
      priorityFeePerGas: { high: 1.0266666666666666, low: -0.41000000000000003, medium: 0.38, veryHigh: 1.3900000000000001 },
      schema: 'network.xyo.blockchain.ethereum.gas',
      timestamp: Date.now() - tenMin,
    },
    {
      baseFee: 38.90155387825,
      feePerGas: { high: 47.9945864396, low: 39.006868093, medium: 100, veryHigh: 44.45384380525 },
      priorityFeePerGas: { high: 1.0266666666666666, low: -0.41000000000000003, medium: 0.38, veryHigh: 1.3900000000000001 },
      schema: 'network.xyo.blockchain.ethereum.gas',
      timestamp: Date.now(),
    },
  ]
}
