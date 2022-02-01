import { assertEx } from '@xylabs/sdk-js'
import { XyoPanel } from '@xyo-network/sdk-xyo-client-js'
import { useContext } from 'react'

import { XyoPanelContext } from './Context'

export const useXyoPanel = () => {
  const context = useContext(XyoPanelContext)
  assertEx(context.panel, 'XyoPanel not initialized')
  //we do the cast to make the api non-optional
  return context as { panel: XyoPanel }
}
