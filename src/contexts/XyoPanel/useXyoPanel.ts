import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { XyoPanelContext } from './Context'

export const useXyoPanel = () => {
  const { panel } = useContext(XyoPanelContext)
  return assertEx(panel, 'XyoPanel not initialized')
}
