import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { XyoPanelContext } from './Context'

export const useXyoPanel = () => {
  const { panel, history, progress, reportingErrors, status } = useContext(XyoPanelContext)
  return { history, panel: assertEx(panel, 'XyoPanel not initialized'), progress, reportingErrors, status }
}
