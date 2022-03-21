import { createContext } from 'react'

export interface ArchiveContextProps {
  archive?: string
  setArchive?: (archive: string) => void
}

export const ArchiveContext = createContext<ArchiveContextProps>({})
