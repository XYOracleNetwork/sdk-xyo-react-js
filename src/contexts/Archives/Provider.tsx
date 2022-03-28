import { useAsyncEffect } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useArchivistApi } from '../ArchivistApi'
import { ArchivesContext } from './Context'

export interface ArchivesProviderProps {
  defaultArchives?: string[]
}

export const ArchivesProvider: React.FC<ArchivesProviderProps> = ({ children, defaultArchives = ['temp'] }) => {
  const [archives, setArchives] = useState(defaultArchives)

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

  return <ArchivesContext.Provider value={{ archives }}>{children}</ArchivesContext.Provider>
}
