import { useContextEx } from '../ContextEx'
import { PixelContext } from './Context'

export const usePixel = () => {
  const { pixel } = useContextEx(PixelContext, 'Pixel')
  return pixel
}
