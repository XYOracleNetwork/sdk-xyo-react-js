import { useContextEx } from '@xyo-network/react-shared'

import { WalletContext } from './Context'

export const useWallet = (required = false) => {
  return useContextEx(WalletContext, 'Wallet', required)
}
