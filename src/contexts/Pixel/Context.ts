import { XyPixel } from '@xylabs/pixel'
import { createContext } from 'react'

interface ContextProps {
  pixel?: XyPixel
}

export const PixelContext = createContext<ContextProps>({})
