import { useContextEx } from '../ContextEx'
import { ArchivistApiContext } from './Context'

export const useArchivistApi = () => {
  return useContextEx(ArchivistApiContext, 'ArchivistApi')
}
