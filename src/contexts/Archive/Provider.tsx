import { useState } from 'react'

import { XyoArchiveContext } from './Context'

export interface XyoArchiveProviderProps {
  defaultArchive?: string
}

export const XyoArchiveProvider: React.FC<XyoArchiveProviderProps> = ({ defaultArchive = 'temp', ...props }) => {
  const [archive, setArchive] = useState(defaultArchive)
  return <XyoArchiveContext.Provider value={{ archive, setArchive, ...props }} />
}
