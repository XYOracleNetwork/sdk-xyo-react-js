import { useAsyncEffect } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useArchivistApi } from '../contexts'

export const useArchives = () => {
  const { api } = useArchivistApi()
  const [archives, setArchives] = useState<string[]>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      const loadedArchives = (await api?.archives.get())?.map((response) => response.archive) ?? ['temp']
      if (mounted()) {
        setArchives(loadedArchives)
      }
    },
    [api]
  )
  return archives
}
