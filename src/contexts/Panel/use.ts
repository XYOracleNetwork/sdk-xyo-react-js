import { useContextEx } from '../ContextEx'
import { XyoPanelContext } from './Context'

export const useXyoPanel = () => {
  const { panel, history, progress, reportingErrors, status } = useContextEx(XyoPanelContext, 'XyoPanel')
  return { history, panel, progress, reportingErrors, status }
}
