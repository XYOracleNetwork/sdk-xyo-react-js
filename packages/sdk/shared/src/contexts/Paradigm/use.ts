import { useContextEx } from '../contextEx'
import { ParadigmContext } from './Context'

export const useParadigm = (required = true) => {
  return useContextEx(ParadigmContext, 'Paradigm', required)
}
