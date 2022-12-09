import { XyoEthereumGasEtherchainV1Payload } from '@xyo-network/etherchain-ethereum-gas-v1-payload-plugin'
import { GasPriceWitnessUIBasePayload } from '@xyo-network/react-gas-price'

export const useEtherchainV1Transformer = (payload?: XyoEthereumGasEtherchainV1Payload): GasPriceWitnessUIBasePayload | undefined => {
  if (payload) {
    return {
      baseFee: {
        label: 'currentBaseFee',
        value: payload.currentBaseFee,
      },
      gasPrice: [
        {
          price: {
            label: 'safeLow',
            value: payload.safeLow,
          },
        },
        {
          price: {
            label: 'standard',
            value: payload.standard,
          },
        },
        {
          price: {
            label: 'fast',
            value: payload.fast,
          },
        },
        {
          price: {
            label: 'fastest',
            value: payload.fastest,
          },
        },
      ],
      timestamp: payload.timestamp,
      website: 'https://www.etherchain.org/api/gasPriceOracle',
    }
  }
}
