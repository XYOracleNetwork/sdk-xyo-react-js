import { usePromise } from '@xylabs/react-promise'
import { type Utm, UtmSchema } from '@xyo-network/advertising-payload-plugins'
import { useMemo } from 'react'

import { UtmStorageArchivist } from '../lib/index.ts'
import { useDefaultUtmPageState } from './useDefaultUtmPageState.ts'

export const useCaptureUtmLocation = () => {
  const [{
    utm_campaign, utm_content, utm_medium, utm_source, utm_term,
  }] = useDefaultUtmPageState()

  const [sessionStorageArchivist, error] = usePromise(async () => {
    return await UtmStorageArchivist()
  }, [])

  const utmPayload = useMemo(() => {
    // Construct the base UTM payload
    const utm: Utm = { schema: UtmSchema }

    // Conditionally add all the UTM parameters present
    if (utm_campaign) utm.utm_campaign = utm_campaign
    if (utm_content) utm.utm_content = utm_content
    if (utm_medium) utm.utm_medium = utm_medium
    if (utm_source) utm.utm_source = utm_source
    if (utm_term) utm.utm_term = utm_term

    return utm
  }, [utm_campaign, utm_content, utm_medium, utm_source, utm_term])

  const [,insertError] = usePromise(async () => {
    if (utmPayload && sessionStorageArchivist) {
      await sessionStorageArchivist.insert([utmPayload])
    }
  }, [sessionStorageArchivist, utmPayload])

  return { utmPayload, error: error ?? insertError }
}
