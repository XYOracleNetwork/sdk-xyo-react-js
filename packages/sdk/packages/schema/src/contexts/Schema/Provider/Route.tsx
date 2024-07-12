import type { WithChildren } from '@xylabs/react-shared'
import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { SchemaContext } from '../Context.js'
import { useSchema } from '../use.js'
import { SchemaMemoryProvider } from './Memory.js'
import { SchemaProviderProps } from './Props.js'

const SchemaRouteProviderInner: React.FC<WithChildren> = ({ children }) => {
  const { schema, setSchema, schemaList } = useSchema()

  const [params, setParams] = useSearchParams()

  const routeSchema = params.get('schema')

  //update the network stored in the route
  const setSchemaParam = useCallback(
    (schema?: string) => {
      if (schema) {
        params.set('schema', schema)
        setParams(params, { replace: true })
        setSchema?.(schema)
      } else {
        params.delete('network')
      }
    },
    [params, setParams, setSchema],
  )

  //if the network is actively changed, update both memory and route
  const setSchemaLocal = useCallback(
    (schema: string) => {
      setSchemaParam(schema)
      setSchema?.(schema)
    },
    [setSchemaParam, setSchema],
  )

  //sync memory and route storage of network
  useEffect(() => {
    if (routeSchema !== schema) {
      if (routeSchema === undefined && schema !== undefined) {
        //if the route does not have a network selected, use what is in the memory context
        setSchemaLocal(schema)
      } else if (routeSchema) {
        //if the route has a selection and it is different from memory, update memory
        setSchema?.(routeSchema)
      }
    }
  }, [routeSchema, schema, setSchemaParam, setSchema, setSchemaLocal])

  return <SchemaContext.Provider value={{ provided: true, schema, schemaList, setSchema: setSchemaLocal }}>{children}</SchemaContext.Provider>
}

export const SchemaRouteProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ knownSchemaList, defaultSchema, ...props }) => {
  return (
    <SchemaMemoryProvider knownSchemaList={knownSchemaList} defaultSchema={defaultSchema}>
      <SchemaRouteProviderInner {...props} />
    </SchemaMemoryProvider>
  )
}
