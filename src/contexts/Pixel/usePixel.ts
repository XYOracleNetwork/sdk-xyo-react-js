import { useContext } from 'react'

import { PixelContext } from './Context'

export const usePixel = () => {
  const { pixel } = useContext(PixelContext)
  return pixel
}
