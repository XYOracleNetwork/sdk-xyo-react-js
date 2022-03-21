import { createContext } from 'react'

export interface XyoArchiveContextProps {
  archive?: string
  setArchive?: (archive: string) => void
}

export const XyoArchiveContext = createContext<XyoArchiveContextProps>({})
