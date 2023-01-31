import { axios, AxiosResponse } from '@xyo-network/axios'

import { LatLngTuple, LookupPostRequest, LookupResponse } from './types'

export interface OpenElevationApiClientConfig {
  apiDomain?: string
  version?: string
}

export class OpenElevationApiClient {
  private version = 'v1'
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private apiDomain = `https://api.open-elevation.com/api/${this.version}`

  constructor(config?: OpenElevationApiClientConfig) {
    const { apiDomain, version } = config ?? {}
    if (apiDomain) {
      this.apiDomain = apiDomain
    }
    this.apiDomain = `${this.apiDomain}${version ?? ''}`
  }

  async lookupGet([lat, lng]: LatLngTuple): Promise<LookupResponse> {
    return this.unwrapResponse(await axios.get(`${this.apiDomain}/lookup?locations=${lat},${lng}`))
  }

  async lookupPost(locations: LookupPostRequest): Promise<LookupResponse> {
    return this.unwrapResponse(await axios.post(`${this.apiDomain}/lookup`, locations))
  }

  unwrapResponse(response?: AxiosResponse) {
    return response?.data
  }
}
