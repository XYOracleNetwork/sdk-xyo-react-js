import { useContextEx } from '@xyo-network/react-shared'

import { PanelContext } from './Context'

export const usePanel = () => {
  const { panel, history, progress, reportingErrors, status } = useContextEx(PanelContext, 'XyoPanel')
  return { history, panel, progress, reportingErrors, status }
}
