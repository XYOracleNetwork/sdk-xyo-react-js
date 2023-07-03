import { State as PromiseState, usePromise } from '@xylabs/react-promise'
import { HDWallet } from '@xyo-network/account'
import { AccountInstance } from '@xyo-network/account-model'
import { WalletInstance } from '@xyo-network/wallet-model'
import { Mutex } from 'async-mutex'

let globalWrapperWallet: WalletInstance | undefined = undefined
const globalWrapperWalletMutex = new Mutex()

export const useWrapperAccount = (
  account?: AccountInstance | null,
): [AccountInstance | null | undefined, Error | undefined, PromiseState | undefined] => {
  return usePromise(async () => {
    return await globalWrapperWalletMutex.runExclusive(async () => {
      //if we are expecting to receive a wallet or did receive on, return the override account
      if (account !== undefined) {
        return account
      }

      if (globalWrapperWallet) {
        return globalWrapperWallet
      }

      try {
        globalWrapperWallet = await HDWallet.random()
        console.log(`Global Wrapper Wallet Creation Success: ${globalWrapperWallet.address}`)
      } catch (ex) {
        const error = ex as Error
        console.error(`Global Wrapper Wallet Creation Failed: ${error.message}`)
      }
      return globalWrapperWallet
    })
  }, [account])
}
