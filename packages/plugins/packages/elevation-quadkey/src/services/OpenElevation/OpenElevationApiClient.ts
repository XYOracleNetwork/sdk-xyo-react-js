import axios from 'axios'

import { LatLngTuple, LookupPostRequest, LookupResponse } from './types'

interface OpenElevationApiClientConfig {
  apiDomain?: string
  version?: string
}

export class OpenElevationApiClient {
  private apiDomain = `https://api.open-elevation.com/api/${this.version}`
  private version = 'v1'

  constructor(config?: OpenElevationApiClientConfig) {
    const { apiDomain, version } = config ?? {}
    if (apiDomain) {
      this.apiDomain = apiDomain
    }
    this.apiDomain = `${this.apiDomain}${version}`
  }

  async lookupGet([lat, lng]: LatLngTuple): Promise<LookupResponse> {
    return await axios.get(`${this.apiDomain}/lookup?locations=${lat},${lng}`)
  }

  async lookupPost(locations: LookupPostRequest): Promise<LookupResponse> {
    return await axios.post(`${this.apiDomain}/lookup`, locations)
  }
}
