import { useState } from 'react'

import { ArchiveContext } from './Context'

export const ArchiveProvider: React.FC = ({ children }) => {
  const [archive, setArchive] = useState<string>()

  return <ArchiveContext.Provider value={{ archive, provided: true, setArchive }}>{children}</ArchiveContext.Provider>
}
