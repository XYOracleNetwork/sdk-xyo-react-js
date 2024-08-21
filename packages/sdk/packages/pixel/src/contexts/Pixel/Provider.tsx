import { XyPixel } from '@xylabs/pixel'
import type { WithChildren } from '@xylabs/react-shared'
import React, { useMemo } from 'react'

import { PixelContext } from './Context.ts'

export interface PixelProviderProps {
  id: string
}

export const PixelProvider: React.FC<WithChildren<PixelProviderProps>> = (props) => {
  const {
    children, id,
  } = props
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
