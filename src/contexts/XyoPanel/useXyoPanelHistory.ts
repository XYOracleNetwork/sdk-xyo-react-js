import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { XyoPanelContext } from './Context'

export const useXyoPanelHistory = () => {
  const { history } = useContext(XyoPanelContext)
  return assertEx(history, 'XyoPanel not initialized')
}
