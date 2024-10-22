import { usePromise } from '@xylabs/react-promise'
import { type Utm, UtmSchema } from '@xyo-network/advertising-payload-plugins'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { UtmStorageArchivist } from '../lib/index.ts'
import { useDefaultUtmPageState, UtmQueryParamStrings } from './useDefaultUtmPageState.ts'

export const useCaptureUtmLocation = (clearAfterCapture = true) => {
  const [{
    utm_campaign, utm_content, utm_medium, utm_source, utm_term,
  }] = useDefaultUtmPageState()
  const [,setSearchParams] = useSearchParams()

  const [sessionStorageArchivist, error] = usePromise(async () => {
    return await UtmStorageArchivist()
  }, [])

  const utmPayload = useMemo(() => {
    // Construct the base UTM payload
    const utm: Utm = { schema: UtmSchema }

    // determine if there's a utm field that still has a value
    // if there is none, it means that either the page loaded
    // with none or they've already been captured
    const utmParams = {
      utm_campaign, utm_content, utm_medium, utm_source, utm_term,
    }
    const foundUpdatedUtmParams = Object.entries(utmParams).some(([key, value]) => {
      return key.includes('utm_') && value
    })

    if (foundUpdatedUtmParams) {
      // Conditionally add all the UTM parameters present
      if (utm_campaign) utm.utm_campaign = utm_campaign
      if (utm_content) utm.utm_content = utm_content
      if (utm_medium) utm.utm_medium = utm_medium
      if (utm_source) utm.utm_source = utm_source
      if (utm_term) utm.utm_term = utm_term

      return utm
    } else {
      return null
    }
  }, [utm_campaign, utm_content, utm_medium, utm_source, utm_term])

  const [,insertError] = usePromise(async () => {
    if (utmPayload && sessionStorageArchivist) {
      // insert params into session storage
      await sessionStorageArchivist.insert([utmPayload])

      if (clearAfterCapture) {
        // remove the utm params from the URL
        setSearchParams(() => {
          const newParams = new URLSearchParams()
          for (const value of Object.values(UtmQueryParamStrings)) {
            newParams.delete(value)
          }
          return newParams
        })
      }
    }
  }, [sessionStorageArchivist, utmPayload, clearAfterCapture])

  return { utmPayload, error: error ?? insertError }
}
