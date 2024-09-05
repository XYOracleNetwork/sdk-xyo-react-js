import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import type { XnsNameCaptureProps } from '../Props.ts'

export const useXnsNameCaptureRouting = (props: XnsNameCaptureProps) => {
  const [params] = useSearchParams()
  const signatureParam = params.get('signature')
  const signatureParamString = signatureParam ? `&signature=${encodeURIComponent(signatureParam)}` : ''

  return useMemo(() => ({
    ...props,
    paramsString: signatureParamString,
  }), [props, signatureParamString])
}
