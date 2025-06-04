import type { Decorator } from '@storybook/react-vite'
import { DefaultSeedPhrase } from '@xyo-network/react-storybook'
import type { WalletInstance } from '@xyo-network/wallet-model'
import React, { useMemo, useState } from 'react'

import { WalletProvider } from '../../../contexts/index.ts'
import { useWallet } from '../../../hooks/index.ts'

export const WalletProviderDecorator: Decorator = (Story, context) => {
  const [rootWallet] = useWallet({ mnemonic: DefaultSeedPhrase })
  const [wallet, setWallet] = useState<WalletInstance>()

  useMemo(() => {
    if (rootWallet) {
      setTimeout(() => {
        setWallet(rootWallet)
      }, 1000)
    }
  }, [rootWallet])
  return (
    <WalletProvider rootWallet={wallet}>
      <Story {...context} />
    </WalletProvider>
  )
}
