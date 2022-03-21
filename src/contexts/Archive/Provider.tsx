import { useState } from 'react'

import { ArchiveContext } from './Context'

export interface ArchiveProviderProps {
  defaultArchive?: string
}

export const ArchiveProvider: React.FC<ArchiveProviderProps> = ({ defaultArchive = 'temp', ...props }) => {
  const [archive, setArchive] = useState(defaultArchive)
  return <ArchiveContext.Provider value={{ archive, setArchive, ...props }} />
}
