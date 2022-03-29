import { useContextEx } from '../ContextEx'
import { ArchivistApiContext } from './Context'

export const useArchivistApi = (required = true) => {
  return useContextEx(ArchivistApiContext, 'ArchivistApi', required)
}
