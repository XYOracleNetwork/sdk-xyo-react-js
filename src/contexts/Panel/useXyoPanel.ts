import { useContext } from 'react'

import { XyoPanelContext } from './Context'

export const useXyoPanel = () => {
  const { panel, history, progress, reportingErrors, status } = useContext(XyoPanelContext)
  return { history, panel, progress, reportingErrors, status }
}
