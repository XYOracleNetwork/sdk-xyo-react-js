import { useAsyncEffect } from '@xylabs/react-shared'
import { XyoApiError } from '@xyo-network/api'
import { useArchive } from '@xyo-network/react-archive'
import { useArchivistApi } from '@xyo-network/react-archivist-api'
import { useState } from 'react'

import { NetworkXyoLocationHeatmapQuadkeyAnswerPayload } from '../types'
import { useQuadKeyPayloadsToFeatures } from './useQuadKeyPayloadsToFeatures'

const useFetchPayloads = (hashes?: string[]) => {
  const { api: ArchivistApi } = useArchivistApi()
  const { archive } = useArchive()
  const [apiError, setApiError] = useState<XyoApiError>()
  const [payloads, setPayloads] = useState<NetworkXyoLocationHeatmapQuadkeyAnswerPayload[]>()
  const { features, multipleFeatureSets } = useQuadKeyPayloadsToFeatures(payloads)
  const [notFound, setNotFound] = useState(false)
  const [inFlight, setInFlight] = useState(false)

  useAsyncEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    async (mounted) => {
      if (ArchivistApi && payloads === undefined && hashes?.length && !inFlight) {
        try {
          setInFlight(true)
          const payloads = await Promise.allSettled(hashes.map((hash) => ArchivistApi.archive(archive).payload.hash(hash).get()))
          if (payloads?.length) {
            const validPayloads: NetworkXyoLocationHeatmapQuadkeyAnswerPayload[] = []
            payloads.forEach((result) => {
              if (result.status === 'fulfilled' && result.value && result.value[0]) {
                validPayloads.push(result.value[0] as NetworkXyoLocationHeatmapQuadkeyAnswerPayload)
              } else if (result.status === 'rejected') {
                setApiError(result.reason)
              }
            })

            if (validPayloads.length) {
              setPayloads(validPayloads)
            }

            if (validPayloads.length === 0 && apiError === undefined) {
              setNotFound(true)
            }
          }
        } catch (e) {
          if (mounted()) {
            setApiError(e as XyoApiError)
          }
        }
      }
    },
    [ArchivistApi, apiError, archive, hashes, inFlight, payloads]
  )

  return { apiError, features, multipleFeatureSets, notFound }
}

export { useFetchPayloads }
