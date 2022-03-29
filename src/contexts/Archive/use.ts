import { useContextEx } from '../ContextEx'
import { ArchiveContext } from './Context'

export const useArchive = (required = false) => {
  return useContextEx(ArchiveContext, 'Archive', required)
}
