import { useContextEx } from '../ContextEx'
import { ArchiveContext } from './Context'

export const useArchive = () => {
  return useContextEx(ArchiveContext, 'Archive')
}
