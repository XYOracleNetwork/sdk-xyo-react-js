import { XyPixel } from '@xylabs/pixel'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import { PixelContext } from './Context.ts'
import type { PixelContextState } from './State.ts'

export interface PixelProviderProps {
  id: string
}

export const PixelProvider: React.FC<PropsWithChildren<PixelProviderProps>> = (props) => {
  const { children, id } = props
  XyPixel.init(id)

  const value: PixelContextState = useMemo(() => ({
    pixel: XyPixel.instance,
    provided: true,
  }), [XyPixel.instance])

  return (
    <PixelContext
      value={value}
    >
      {children}
    </PixelContext>
  )
}
