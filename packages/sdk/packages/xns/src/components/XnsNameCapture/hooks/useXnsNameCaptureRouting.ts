import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import type { XnsNameCaptureProps } from '../Props.ts'

export const useXnsNameCaptureRouting = (props: XnsNameCaptureProps) => {
  const [params] = useSearchParams()
  const signatureParam = params.get('signature')
  const signatureParamString = signatureParam ? `&signature=${encodeURIComponent(signatureParam)}` : ''

  const navigate = useNavigate()

  return useMemo(() => ({
    ...props,
    navigate: props.navigate ?? ((to: string) => navigate(to)),
    paramsString: signatureParamString,
  }), [props, signatureParamString])
}
