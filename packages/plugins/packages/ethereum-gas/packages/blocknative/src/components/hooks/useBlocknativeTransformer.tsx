import { EthereumGasBlocknativePayload } from '@xyo-network/blocknative-ethereum-gas-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const useBlocknativeTransformer = (payload?: EthereumGasBlocknativePayload): GasPriceWitnessUIBasePayload | undefined => {
  const blockPrices = payload?.blockPrices?.[0]
  if (blockPrices && blockPrices.estimatedPrices?.length) {
    const estimatedPrices = blockPrices?.estimatedPrices
    const gasPrice = estimatedPrices.map((price) => ({
      price: {
        label: `Confidence - ${price.confidence}`,
        value: price.price,
      },
      priorityFee: {
        label: 'maxPriorityFeePerGas',
        value: price.maxPriorityFeePerGas,
      },
    }))

    return {
      baseFee: {
        label: 'baseFeePerGas',
        value: blockPrices.baseFeePerGas,
      },
      blockNumber: {
        label: 'blockNumber',
        value: blockPrices.blockNumber,
      },
      gasPrice,
      timestamp: payload.timestamp,
      website: 'https://docs.Blocknative.io/v5/api/providers/provider/#Provider-getFeeData',
    }
  }
}
