import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoArchivistWrapper } from '@xyo-network/archivist'
import { XyoPayload, XyoPayloadFindFilter, XyoPayloads } from '@xyo-network/payload'
import { useContextEx, useDataState } from '@xyo-network/react-shared'
import { useRef, useState } from 'react'

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
  const loadingRef = useRef<boolean>(false)
  const refreshPayloads = () => setRefresh((previous) => previous + 1)

  return { archivist, error, loadingRef, payloads, refresh, refreshPayloads, setError, setPayloads }
}

export const useArchivistGet = (ids?: string[], required = false): [XyoPayload[]?, Error?, RefreshCallback?] => {
  const [savedIds] = useDataState(ids)
  const { archivist, error, loadingRef, payloads, refresh, setError, setPayloads, refreshPayloads } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && savedIds && !loadingRef.current) {
          const wrapper = new XyoArchivistWrapper(archivist)
          loadingRef.current = true
          const result = (await wrapper?.get(savedIds ?? [])) ?? []
          loadingRef.current = false
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        loadingRef.current = false
        setError(ex as Error)
      }
    },
    [archivist, savedIds, refresh, setError, setPayloads, loadingRef],
  )
  return [payloads, error, refreshPayloads]
}

export const useArchivistFind = <TFilter extends XyoPayloadFindFilter>(
  filter: TFilter,
  required = false,
): [XyoPayload[]?, Error?, RefreshCallback?] => {
  const [savedFilter] = useDataState(filter)
  const [payloads, setPayloads] = useState<XyoPayload[]>()
  const { archivist, error, loadingRef, refresh, setError, refreshPayloads } = useSharedUseArchivistState(required)
  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && savedFilter && !loadingRef.current) {
          const wrapper = new XyoArchivistWrapper(archivist)
          loadingRef.current = true
          const result = await wrapper?.find(savedFilter)
          loadingRef.current = false
          if (mounted()) {
            setError(undefined)
            setPayloads(result)
          }
        }
      } catch (ex) {
        setError(ex as Error)
        loadingRef.current = false
      }
    },
    [archivist, loadingRef, refresh, savedFilter, setError, setPayloads],
  )
  return [payloads, error, refreshPayloads]
}

export const useArchivistInsert = (payloads: XyoPayload[], required = false): [XyoPayload[]?, Error?] => {
  const [savedPayloads] = useDataState(payloads)
  const {
    archivist,
    error,
    loadingRef,
    payloads: resultPayloads,
    refresh,
    setError,
    setPayloads: setResultPayloads,
  } = useSharedUseArchivistState(required)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      try {
        if (archivist && savedPayloads && !loadingRef.current) {
          const wrapper = new XyoArchivistWrapper(archivist)
          loadingRef.current = true
          const result = await wrapper.insert(savedPayloads)
          loadingRef.current = false
          if (mounted()) {
            setError(undefined)
            setResultPayloads(result)
          }
        }
      } catch (ex) {
        loadingRef.current = false
        setError(ex as Error)
      }
    },
    [archivist, loadingRef, refresh, savedPayloads, setError, setResultPayloads],
  )
  return [resultPayloads, error]
}

export const useArchivistAll = (required = false): [XyoPayload[]?, Error?] => {
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

export const useArchivistClear = (required = false): [XyoPayload[]?, Error?] => {
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
