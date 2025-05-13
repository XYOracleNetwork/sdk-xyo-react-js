import { useContextEx } from '@xylabs/react-shared'

import { PixelContext } from './Context.ts'

export const usePixel = (required = true) => {
  const { pixel } = useContextEx(PixelContext, 'Pixel', required)
  return pixel
}
