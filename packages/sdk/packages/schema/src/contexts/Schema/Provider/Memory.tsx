import { compact } from '@xylabs/lodash'
import { WithChildren } from '@xylabs/react-shared'
import React, { useEffect, useMemo, useState } from 'react'

import { useSchemaStats } from '../../../hooks/index.ts'
import { SchemaContext } from '../Context.ts'
import { SchemaProviderProps } from './Props.ts'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ defaultSchema, knownSchemaList, ...props }) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useState<string[] | undefined>(knownSchemaList)
  const [fetchedSchemaStats] = useSchemaStats()

  useEffect(() => {
    if (fetchedSchemaStats) {
      const schemaList = compact(fetchedSchemaStats.map(({ name }) => name))
      setSchemaList(schemaList)
    }
  }, [fetchedSchemaStats])

  const value = useMemo(() => ({ provided: true, schema, schemaList: knownSchemaList ?? schemaList, setSchema, setSchemaList }), [schema, schemaList, knownSchemaList])

  return <SchemaContext.Provider value={value} {...props} />
}
