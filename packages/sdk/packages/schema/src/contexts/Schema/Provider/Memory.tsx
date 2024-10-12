import { exists } from '@xylabs/exists'
import type { WithChildren } from '@xylabs/react-shared'
import React, { useMemo, useState } from 'react'

import { useSchemaStats } from '../../../hooks/index.ts'
import { SchemaContext } from '../Context.ts'
import type { SchemaProviderProps } from './Props.ts'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({
  defaultSchema, knownSchemaList, ...props
}) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useState<string[] | undefined>(knownSchemaList)
  const [fetchedSchemaStats] = useSchemaStats()

  useMemo(() => {
    if (fetchedSchemaStats) {
      const schemaList = (fetchedSchemaStats.map(({ name }) => name)).filter(exists)
      setSchemaList(schemaList)
    }
  }, [fetchedSchemaStats])

  const value = useMemo(() => ({
    provided: true, schema, schemaList: knownSchemaList ?? schemaList, setSchema, setSchemaList,
  }), [schema, schemaList, knownSchemaList])

  return <SchemaContext.Provider value={value} {...props} />
}
