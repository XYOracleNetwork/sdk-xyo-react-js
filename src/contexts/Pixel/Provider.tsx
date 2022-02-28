import { XyPixel } from '@xylabs/pixel'
import React, { PropsWithChildren } from 'react'

import { PixelContext } from './Context'

interface Props {
  id: string
}

export const PixelProvider: React.FC<PropsWithChildren<Props>> = (props) => {
  const { children, id } = props
  XyPixel.init(id)

  return (
    <PixelContext.Provider
      value={{
        pixel: XyPixel.instance,
      }}
    >
      {children}
    </PixelContext.Provider>
  )
}
