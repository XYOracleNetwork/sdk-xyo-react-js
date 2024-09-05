import React, { useMemo } from 'react'

import { useXnsNameCaptureProviders, useXnsNameCaptureRouting } from './hooks/index.ts'
import type { XnsNameCaptureProps } from './Props.ts'
import { XnsNameCapture } from './XnsNameCapture.tsx'

export const XnsNameCaptureWithContext: React.FC<XnsNameCaptureProps> = (props) => {
  const routingProps = useXnsNameCaptureRouting(props)
  const providersProps = useXnsNameCaptureProviders(routingProps)

  const updatedProps = useMemo<XnsNameCaptureProps>(() => ({
    ...props,
    ...routingProps,
    ...providersProps,
  }), [providersProps])

  return (
    <XnsNameCapture {...updatedProps} />
  )
}
