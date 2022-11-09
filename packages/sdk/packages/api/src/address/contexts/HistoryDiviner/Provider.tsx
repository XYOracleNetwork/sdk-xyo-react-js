import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { XyoRemoteAddressHistoryDiviner } from '@xyo-network/api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { useApi } from '../../../contexts'
import { AddressHistoryDivinerContext } from './Context'

export const AddressHistoryDivinerProvider: React.FC<WithChildren<ContextExProviderProps>> = ({ required = false, children }) => {
  const [diviner, setDiviner] = useState<XyoRemoteAddressHistoryDiviner | undefined>()
  const { api } = useApi()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api) {
        const diviner = await XyoRemoteAddressHistoryDiviner.create({
          api,
          config: {
            schema: XyoRemoteAddressHistoryDiviner.configSchema,
          },
        })
        if (mounted()) {
          setDiviner?.(diviner)
        }
      }
    },
    [api, setDiviner],
  )

  return (
    <AddressHistoryDivinerContext.Provider
      value={{
        diviner,
        provided: true,
        setDiviner,
      }}
    >
      {diviner ? children : required ? null : children}
    </AddressHistoryDivinerContext.Provider>
  )
}
