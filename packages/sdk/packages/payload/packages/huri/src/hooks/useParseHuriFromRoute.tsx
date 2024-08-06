import { useParams, useSearchParams } from 'react-router-dom'

import { useBuildHuri } from './useBuildHuri.tsx'

export type RouteOptions = 'routeParam' | 'searchParam' | 'any'

export const useParseHuriFromRoute = (routeOption: RouteOptions = 'any') => {
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
      return huriFromHashParam || decodedHuriParam
    }
  }
}
