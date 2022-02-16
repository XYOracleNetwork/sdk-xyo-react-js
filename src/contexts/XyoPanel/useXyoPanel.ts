import { assertEx } from '@xylabs/sdk-js'
import { useContext } from 'react'

import { XyoPanelContext } from './Context'

export const useXyoPanel = () => {
  const { panel, history, busyReporting, reportingErrors } = useContext(XyoPanelContext)
  return { busyReporting, history, panel: assertEx(panel, 'XyoPanel not initialized'), reportingErrors }
}
