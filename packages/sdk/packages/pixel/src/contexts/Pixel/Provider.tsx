import { XyPixel } from '@xylabs/pixel'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'

import { PixelContext } from './Context.ts'

export interface PixelProviderProps {
  id: string
}

export const PixelProvider: React.FC<PropsWithChildren<PixelProviderProps>> = (props) => {
  const { children, id } = props
  XyPixel.init(id)

  const value = useMemo(() => ({
    pixel: XyPixel.instance,
    provided: true,
  }), [XyPixel.instance])

  return (
    <PixelContext.Provider
      value={value}
    >
      {children}
    </PixelContext.Provider>
  )
}
