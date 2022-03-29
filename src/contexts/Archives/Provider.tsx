import { useAsyncEffect } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useArchivistApi } from '../ArchivistApi'
import { ArchivesContext } from './Context'

export const ArchivesProvider: React.FC = ({ children }) => {
  const [archives, setArchives] = useState<string[]>()

  const { api } = useArchivistApi()
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

  return (
    <ArchivesContext.Provider value={{ archives, provided: true, setArchives }}>{children}</ArchivesContext.Provider>
  )
}
