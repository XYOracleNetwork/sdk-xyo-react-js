import { useContextEx } from '@xyo-network/react-shared'

import { SchemaContext } from './Context.ts'
import { SchemaContextState } from './State.ts'

export const useSchema = (required = false) => {
  return useContextEx<SchemaContextState>(SchemaContext, 'Schema', required)
}
