import type { EthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import type { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const useEtherscanTransformer = (payload?: EthereumGasEtherscanPayload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      baseFee: {
        label: 'suggestBaseFee',
        value: payload.result?.suggestBaseFee ? Number.parseFloat(payload.result?.suggestBaseFee) : undefined,
      },
      blockNumber: {
        label: 'LastBlock',
        value: payload.result?.LastBlock ? Number.parseFloat(payload.result?.LastBlock) : undefined,
      },
      gasPrice: [
        {
          price: {
            label: 'SafeGasPrice',
            value: payload.result?.SafeGasPrice ? Number.parseFloat(payload.result?.SafeGasPrice) : undefined,
          },
        },
        {
          price: {
            label: 'ProposeGasPrice',
            value: payload.result?.ProposeGasPrice ? Number.parseFloat(payload.result?.ProposeGasPrice) : undefined,
          },
          // No distinct priority fee
        },
        {
          price: {
            label: 'FastGasPrice',
            value: payload.result?.FastGasPrice ? Number.parseFloat(payload.result?.FastGasPrice) : undefined,
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://docs.etherscan.io/api-endpoints/gas-tracker#get-gas-oracle',
    }
  }
}
