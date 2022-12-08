import { XyoEthereumGasEtherscanPayload } from '@xyo-network/etherscan-ethereum-gas-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const useEtherscanTransformer = (payload?: XyoEthereumGasEtherscanPayload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      baseFee: {
        label: 'suggestBaseFee',
        value: parseFloat(payload.result.suggestBaseFee),
      },
      blockNumber: {
        label: 'LastBlock',
        value: parseFloat(payload.result.LastBlock),
      },
      gasPrice: [
        {
          price: {
            label: 'ProposeGasPrice',
            value: parseFloat(payload.result.ProposeGasPrice),
          },
          // No distinct priority fee
        },
        {
          price: {
            label: 'SafeGasPrice',
            value: parseFloat(payload.result.SafeGasPrice),
          },
        },
        {
          price: {
            label: 'FastGasPrice',
            value: parseFloat(payload.result.FastGasPrice),
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://docs.etherscan.io/api-endpoints/gas-tracker#get-gas-oracle',
    }
  }
}
