import { useContextEx } from '@xylabs/react-shared'

import { SchemaContext } from './Context.ts'
import type { SchemaContextState } from './State.ts'

export const useSchema = (required = false) => {
  return useContextEx<SchemaContextState>(SchemaContext, 'Schema', required)
}
