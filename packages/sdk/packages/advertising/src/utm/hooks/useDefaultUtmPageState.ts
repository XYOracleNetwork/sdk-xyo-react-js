import { useDefaultPageState } from './useDefaultPageState.ts'

export const UtmQueryParamStrings = {
  utmCampaign: 'utm_campaign',
  utmContent: 'utm_content',
  utmMedium: 'utm_medium',
  utmSource: 'utm_source',
  utmTerm: 'utm_term',
} as const

export type UtmQueryParams = typeof UtmQueryParamStrings[keyof typeof UtmQueryParamStrings]

/** Get the default page state for utm values from specific query params */
export const useDefaultUtmPageState = () => useDefaultPageState<UtmQueryParams[]>({ queryParams: Object.values(UtmQueryParamStrings) })
