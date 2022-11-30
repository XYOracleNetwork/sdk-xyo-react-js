export type LatLngTuple = [number, number]

export interface LatLngBase {
  latitude: number
  longitude: number
}

export interface LocationElevation extends LatLngBase {
  elevation: number
}

export interface LookupResponse {
  results: LocationElevation[]
}

export interface LookupPostRequest {
  locations: LatLngBase[]
}
