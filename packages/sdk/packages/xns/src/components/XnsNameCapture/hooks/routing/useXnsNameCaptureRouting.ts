import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { XnsNameCaptureProps } from '../../Props.ts'
import { useXnsNameFromLocation } from './useXnsNameFromLocation.ts'

export const useXnsNameCaptureRouting = (props: XnsNameCaptureProps) => {
  const [params] = useSearchParams()

  const navigate = useNavigate()

  const [name, error] = useXnsNameFromLocation()

  return useMemo(() => ({
    ...props,
    defaultXnsName: name,
    routingError: error,
    navigate: props.navigate ?? ((to: string) => navigate(to)),
    paramsString: props.paramsString ? `${props.paramsString}${params.toString()}` : params.toString(),
  }), [props, params, name, error])
}
