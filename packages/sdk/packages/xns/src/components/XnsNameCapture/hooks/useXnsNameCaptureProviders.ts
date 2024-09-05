import { useMixpanel } from '@xylabs/react-mixpanel'
import { useMemo } from 'react'

import type { XnsNameCaptureProps } from '../Props.ts'

export const useXnsNameCaptureProviders = (props: XnsNameCaptureProps) => {
  const mixpanel = useMixpanel()

  return useMemo(() => ({
    ...props,
    mixpanel,
  }), [props, mixpanel])
}
