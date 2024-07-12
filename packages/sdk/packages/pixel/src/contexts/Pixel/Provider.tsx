import { XyPixel } from '@xylabs/pixel'
import { WithChildren } from '@xylabs/react-shared'

import { PixelContext } from './Context.js'

export interface PixelProviderProps {
  id: string
}

export const PixelProvider: React.FC<WithChildren<PixelProviderProps>> = (props) => {
  const { children, id } = props
  XyPixel.init(id)

  return (
    <PixelContext.Provider
      value={{
        pixel: XyPixel.instance,
        provided: true,
      }}
    >
      {children}
    </PixelContext.Provider>
  )
}
