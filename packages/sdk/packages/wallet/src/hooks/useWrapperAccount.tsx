import { usePromise } from '@xylabs/react-promise'
import { HDWallet } from '@xyo-network/account'
import { AccountInstance } from '@xyo-network/account-model'
import { WalletInstance } from '@xyo-network/wallet-model'
import { Mutex } from 'async-mutex'

let globalWrapperWallet: WalletInstance | undefined = undefined
const globalWrapperWalletMutex = new Mutex()

export const useWrapperAccount = (account?: AccountInstance): AccountInstance | undefined => {
  const [wallet] = usePromise(async () => {
    return await globalWrapperWalletMutex.runExclusive(async () => {
      if (globalWrapperWallet) {
        return globalWrapperWallet
      }
      try {
        globalWrapperWallet = await HDWallet.random()
      } catch (ex) {
        const error = ex as Error
        console.error(`Wrapper Wallet Creation Failed: ${error.message}`)
      }
      return globalWrapperWallet
    })
  }, [])
  return account ?? wallet
}
