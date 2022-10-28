import { useAsyncEffect, WithChildren } from '@xylabs/react-shared'
import { ArchiveListApiDiviner } from '@xyo-network/api'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useState } from 'react'

import { ArchiveListApiDivinerContext } from './Context'

/** Builds the archivist list diviner module */
export const ArchiveListApiDivinerProvider: React.FC<WithChildren> = ({ children }) => {
  const { api } = useArchivistApi()
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

  return <ArchiveListApiDivinerContext.Provider value={{ diviner, provided: true, setDiviner }}>{children}</ArchiveListApiDivinerContext.Provider>
}
