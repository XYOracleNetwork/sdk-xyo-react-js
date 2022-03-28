import { createContext } from 'react'

export interface ArchivesContextProps {
  archives?: string[]
}

export const ArchivesContext = createContext<ArchivesContextProps>({})
