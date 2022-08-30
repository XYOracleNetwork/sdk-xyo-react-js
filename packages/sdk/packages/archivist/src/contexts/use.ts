import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistFindQueryPayloadSchema, XyoArchivistGetQueryPayloadSchema, XyoPayloadFindFilter } from '@xyo-network/archivist'
import { XyoPayload, XyoPayloads } from '@xyo-network/payload'
import { useContextEx } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ArchivistContext } from './Context'

export const useArchivist = (required = false) => {
  return useContextEx(ArchivistContext, 'Archivist', required)
}

export const useArchivistGet = (ids?: string[], required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const [, result] = archivist ? await archivist.query({ hashes: ids ?? [], schema: XyoArchivistGetQueryPayloadSchema }) : []
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, ids],
  )
  return [payloads, error]
}

export const useArchivistFind = <TFilter extends XyoPayloadFindFilter>(filter: TFilter, required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const [, result] = archivist ? await archivist.query({ filter, schema: XyoArchivistFindQueryPayloadSchema }) : []
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist, filter],
  )
  return [payloads, error]
}
