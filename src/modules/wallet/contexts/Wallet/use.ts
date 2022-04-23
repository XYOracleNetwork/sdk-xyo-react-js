import { useContextEx } from '../../../context-ex'
import { WalletContext } from './Context'

export const useWallet = (required = false) => {
  return useContextEx(WalletContext, 'Wallet', required)
}
