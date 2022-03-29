import { XyPixel } from '@xylabs/pixel'

import { PixelContext } from './Context'

export interface PixelProviderProps {
  id: string
}

export const PixelProvider: React.FC<PixelProviderProps> = (props) => {
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
