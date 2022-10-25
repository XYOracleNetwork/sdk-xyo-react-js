import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistArchivePayloadSchemaStats } from '@xyo-network/api'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useState } from 'react'

/** @deprecated - use schema stats api diviner */
export const useSchemaStats = (): XyoArchivistArchivePayloadSchemaStats | undefined => {
  const { api } = useArchivistApi(false)
  const { archive = 'temp' } = useArchive(false)
  const [stats, setStats] = useState<XyoArchivistArchivePayloadSchemaStats>()

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api && archive) {
        const stats = await api?.archive(archive).payload.schema.stats.get()
        if (mounted()) {
          setStats(stats)
        }
      }
    },
    [api, archive],
  )

  return stats
}
