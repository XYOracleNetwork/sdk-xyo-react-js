import { useContextEx } from '../../context-ex'
import { ArchivistApiContext } from './Context'

export const useArchivistApi = (required = true) => {
  return useContextEx(ArchivistApiContext, 'ArchivistApi', required)
}
