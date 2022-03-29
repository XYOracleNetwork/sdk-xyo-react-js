import { useContextEx } from '../ContextEx'
import { ArchivesContext } from './Context'

export const useArchives = () => {
  return useContextEx(ArchivesContext, 'Archives')
}
