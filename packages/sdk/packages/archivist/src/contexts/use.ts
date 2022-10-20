import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload, XyoPayloadFindFilter, XyoPayloads } from '@xyo-network/payload'
import { useContextEx, useDataState } from '@xyo-network/react-shared'
import { useState } from 'react'

import { ArchivistContext } from './Context'

type RefreshCallback = () => void

export const useArchivist = (required = false) => {
  return useContextEx(ArchivistContext, 'Archivist', required)
}

const useSharedUseArchivistState = (required: boolean) => {
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const { archivist } = useArchivist(required)
  const [error, setError] = useState<Error>()
  const [refresh, setRefresh] = useState(1)
  const [inFlight, setInFlight] = useState(false)
  const refreshPayloads = () => setRefresh((previous) => previous + 1)

  return { archivist, error, inFlight, payloads, refresh, refreshPayloads, setError, setInFlight, setPayloads }
}

export const useArchivistGet = (ids?: string[], required = false): [(XyoPayload | null)[]?, Error?, RefreshCallback?] => {
  const [savedIds] = useDataState(ids)
  const { archivist, error, inFlight, payloads, refresh, setError, setInFlight, setPayloads, refreshPayloads } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && !inFlight && savedIds) {
          const wrapper = new XyoArchivistWrapper(archivist)
          const result = (await wrapper?.get(savedIds ?? [])) ?? []
          setInFlight(true)
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
            setInFlight(false)
          }
        }
      } catch (ex) {
        setError(ex as Error)
        setInFlight(false)
      }
    },
    [archivist, savedIds, refresh, inFlight, setInFlight, setError, setPayloads],
  )
  return [payloads, error, refreshPayloads]
}

export const useArchivistFind = <TFilter extends XyoPayloadFindFilter>(
  filter: TFilter,
  required = false,
): [XyoPayload[]?, Error?, RefreshCallback?] => {
  const [savedFilter] = useDataState(filter)
  const [payloads, setPayloads] = useState<XyoPayload[]>()
  const { archivist, error, inFlight, refresh, setError, setInFlight, refreshPayloads } = useSharedUseArchivistState(required)
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && !inFlight && savedFilter) {
          const wrapper = new XyoArchivistWrapper(archivist)
          const result = await wrapper?.find(savedFilter)
          setInFlight(true)
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
            setInFlight(false)
          }
        }
      } catch (ex) {
        setError(ex as Error)
        setInFlight(false)
      }
    },
    [archivist, inFlight, refresh, savedFilter, setError, setInFlight, setPayloads],
  )
  return [payloads, error, refreshPayloads]
}

export const useArchivistInsert = (payloads: XyoPayload[], required = false): [(XyoPayload | null)[]?, Error?] => {
  const [savedPayloads] = useDataState(payloads)
  const {
    archivist,
    error,
    inFlight,
    payloads: resultPayloads,
    refresh,
    setError,
    setInFlight,
    setPayloads: setResultPayloads,
  } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && !inFlight && savedPayloads) {
          const wrapper = new XyoArchivistWrapper(archivist)
          const result = await wrapper.insert(savedPayloads)
          setInFlight(true)
          if (mounted()) {
            setError(undefined)
            setResultPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
        setInFlight(true)
      }
    },
    [archivist, inFlight, refresh, savedPayloads, setError, setInFlight, setResultPayloads],
  )
  return [resultPayloads, error]
}

export const useArchivistAll = (required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
        const result = await wrapper?.all()
        if (mounted()) {
          setError(undefined)
          setPayloads(result)
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist],
  )
  return [payloads, error]
}

export const useArchivistClear = (required = false): [(XyoPayload | null)[]?, Error?] => {
  const { archivist } = useArchivist(required)
  const [payloads, setPayloads] = useState<XyoPayloads>()
  const [error, setError] = useState<Error>()
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        const wrapper = archivist ? new XyoArchivistWrapper(archivist) : undefined
        await wrapper?.clear()
        if (mounted()) {
          setError(undefined)
          setPayloads([])
        }
      } catch (ex) {
        setError(ex as Error)
      }
    },
    [archivist],
  )
  return [payloads, error]
}
