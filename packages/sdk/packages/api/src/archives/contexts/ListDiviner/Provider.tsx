import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ArchiveListApiDiviner } from '@xyo-network/api'
import { ContextExProviderProps } from '@xyo-network/react-shared'
import { useState } from 'react'

import { useApi } from '../../../contexts'
import { ArchiveListApiDivinerContext } from './Context'

export const ArchiveListApiDivinerProvider: React.FC<WithChildren<ContextExProviderProps>> = ({ children, required = false }) => {
  const { api } = useApi()
  const [diviner, setDiviner] = useState<ArchiveListApiDiviner>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api) {
        const diviner = await ArchiveListApiDiviner.create({
          api,
          config: {
            schema: ArchiveListApiDiviner.configSchema,
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
    <ArchiveListApiDivinerContext.Provider value={{ diviner, provided: true, setDiviner }}>
      {diviner ? children : required ? null : children}
    </ArchiveListApiDivinerContext.Provider>
  )
}
