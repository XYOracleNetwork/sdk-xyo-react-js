import { useAsyncEffect, WithChildren } from '@xylabs/sdk-react'
import { useState } from 'react'

import { useArchive } from '../../../../archive'
import { useArchivistApi } from '../../../../archivist-api'
import { SchemaContext } from '../Context'
import { SchemaProviderProps } from './Props'

export const SchemaMemoryProvider: React.FC<WithChildren<SchemaProviderProps>> = ({ defaultSchema, knownSchemaList = [], ...props }) => {
  const [schema, setSchema] = useState(defaultSchema)
  const [schemaList, setSchemaList] = useState(knownSchemaList)

  const { api } = useArchivistApi(false)
  const { archive = 'temp' } = useArchive(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (api && archive) {
        const schemaListFetched = await api?.archive(archive).schemas.recent.get()
        if (mounted()) {
          setSchemaList((schemaListFetched?.map((payload) => payload.definition['$id'] as string) as string[]).filter((value) => value !== undefined))
        }
      }
    },
    [api, archive]
  )

  return <SchemaContext.Provider value={{ provided: true, schema, schemaList, setSchema, setSchemaList }} {...props} />
}
