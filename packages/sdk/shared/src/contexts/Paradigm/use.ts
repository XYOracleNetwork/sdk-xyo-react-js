import { useContextEx } from '../contextEx'
import { ParadigmContext } from './Context'

export const useParadigm = (required = true) => {
  const { list } = useContextEx(ParadigmContext, 'Paradigm', required)
  return { list }
}
