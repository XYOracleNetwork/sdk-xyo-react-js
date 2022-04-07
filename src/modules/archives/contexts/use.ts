import { useContextEx } from '../../context-ex'
import { ArchivesContext } from './Context'

export const useArchives = (required = true) => {
  return useContextEx(ArchivesContext, 'Archives', required)
}
