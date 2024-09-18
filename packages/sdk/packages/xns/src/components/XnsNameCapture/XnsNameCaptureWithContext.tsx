import React, { useMemo } from 'react'

import { useXnsNameCaptureRouting } from './hooks/index.ts'
import type { XnsNameCaptureProps } from './Props.ts'
import { XnsNameCapture } from './XnsNameCapture.tsx'

export const XnsNameCaptureWithContext: React.FC<XnsNameCaptureProps> = (props) => {
  const routingProps = useXnsNameCaptureRouting(props)

  const updatedProps = useMemo<XnsNameCaptureProps>(() => ({
    ...props,
    ...routingProps,
  }), [routingProps, props])

  return (
    <XnsNameCapture {...updatedProps} />
  )
}
