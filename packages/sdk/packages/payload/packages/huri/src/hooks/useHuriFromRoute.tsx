import { useParams, useSearchParams } from 'react-router-dom'

import { useBuildHuri } from './useBuildHuri'

export type RouteOptions = 'routeParam' | 'searchParam'

export const usePayloadHuriFromRoute = (routeOption: RouteOptions = 'routeParam') => {
  const { hash: hashParam } = useParams()

  const huriFromHashParam = useBuildHuri(hashParam)

  const [params] = useSearchParams()
  const huriSearchParameter = params.get('huri')
  const decodedHuriParam = decodeURIComponent(huriSearchParameter ?? '')

  switch (routeOption) {
    case 'routeParam': {
      return huriFromHashParam
    }
    case 'searchParam': {
      return decodedHuriParam
    }
    default: {
      return
    }
  }
}
