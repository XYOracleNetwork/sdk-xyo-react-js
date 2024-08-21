import type { EthereumGasEthersPayload } from '@xyo-network/ethers-ethereum-gas-payload-plugin'
import type { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

// eslint-disable-next-line @eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks
export const useEthersTransformer = (payload?: EthereumGasEthersPayload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      gasPrice: [
        {
          price: {
            label: 'gasPrice',
            value: payload.gasPrice ? payload.gasPrice / 1_000_000_000 : undefined,
          },
          priorityFee: {
            label: 'maxPriorityFeePerGas',
            value: payload.maxPriorityFeePerGas ? payload.maxPriorityFeePerGas / 1_000_000_000 : undefined,
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://docs.ethers.io/v5/api/providers/provider/#Provider-getFeeData',
    }
  }
}
