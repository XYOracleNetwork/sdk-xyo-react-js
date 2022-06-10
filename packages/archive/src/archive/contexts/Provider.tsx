import { WithChildren } from '@xylabs/react-shared'
import { useState } from 'react'

import { ArchiveContext } from './Context'

export interface ArchiveProviderProps {
  defaultArchive?: string
}

export const ArchiveProvider: React.FC<WithChildren<ArchiveProviderProps>> = ({ defaultArchive, ...props }) => {
  const [archive, setArchive] = useState<string>()

  return <ArchiveContext.Provider value={{ archive: archive ?? defaultArchive, provided: true, setArchive }} {...props} />
}
