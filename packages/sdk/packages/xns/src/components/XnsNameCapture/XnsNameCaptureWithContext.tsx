import { useUserEvents } from '@xylabs/react-pixel'
import React, { useMemo } from 'react'

import { useXnsNameCaptureProviders, useXnsNameCaptureRouting } from './hooks/index.ts'
import type { XnsNameCaptureProps } from './Props.ts'
import { XnsNameCapture } from './XnsNameCapture.tsx'

export const XnsNameCaptureWithContext: React.FC<XnsNameCaptureProps> = (props) => {
  const routingProps = useXnsNameCaptureRouting(props)
  const providersProps = useXnsNameCaptureProviders(routingProps)
  const userEvents = useUserEvents(false)

  const updatedProps = useMemo<XnsNameCaptureProps>(() => ({
    ...props,
    ...routingProps,
    ...providersProps,
    userEvents: props.userEvents ?? userEvents,
  }), [providersProps])

  return (
    <XnsNameCapture {...updatedProps} />
  )
}
