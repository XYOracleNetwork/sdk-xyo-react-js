import { usePromise } from '@xylabs/react-promise'
import { WithChildren } from '@xylabs/react-shared'
import { WalletInstance } from '@xyo-network/wallet-model'
import { useEffect, useState } from 'react'

import { WalletContext } from './Context'

export interface WalletProviderProps {
  /** @deprecated - BasePath is no longer supported. Set base path outside of WalletProvider */
  basePath?: string
  defaultActiveAccountIndex?: number
  rootWallet?: WalletInstance | null
}

export const WalletProvider: React.FC<WithChildren<WalletProviderProps>> = ({
  basePath,
  children,
  defaultActiveAccountIndex = 0,
  rootWallet = null,
  ...props
}) => {
  const [activeAccountIndex, setActiveAccountIndex] = useState(defaultActiveAccountIndex)

  useEffect(() => {
    if (defaultActiveAccountIndex !== undefined) {
      setActiveAccountIndex(defaultActiveAccountIndex)
    }
  }, [defaultActiveAccountIndex])

  const [activeAccount = null] = usePromise(async () => await rootWallet?.derivePath(activeAccountIndex.toString()), [activeAccountIndex, rootWallet])

  return (
    <WalletContext.Provider
      value={{
        activeAccount,
        activeAccountIndex,
        basePath,
        /* eslint-disable deprecation/deprecation */
        /** @deprecated - Set path for coinTypeWallet outside of provider and pass as rootWallet */
        coinTypeWallet: null,
        provided: true,
        rootWallet,
        setActiveAccountIndex,
      }}
      {...props}
    >
      {children}
    </WalletContext.Provider>
  )
}
