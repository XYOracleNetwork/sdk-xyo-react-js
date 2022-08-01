import { useContextEx } from '../contextEx'
import { ParadigmContext } from './Context'

export const usePixel = (required = true) => {
  const { list } = useContextEx(ParadigmContext, 'Paradigm', required)
  return { list }
}
