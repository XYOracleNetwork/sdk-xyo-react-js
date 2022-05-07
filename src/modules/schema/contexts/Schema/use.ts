import { useContextEx } from '../../../context-ex'
import { SchemaContext } from './Context'
import { SchemaContextState } from './State'

export const useSchema = (required = false) => {
  return useContextEx<SchemaContextState>(SchemaContext, 'Schema', required)
}
