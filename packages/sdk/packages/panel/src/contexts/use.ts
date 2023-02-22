/* eslint-disable deprecation/deprecation */
/* eslint-disable import/no-deprecated */
import { useContextEx } from '@xyo-network/react-shared'

import { PanelContext } from './Context'

/** @deprecated - use sentinel package instead */
export const usePanel = () => {
  const { panel, history, progress, reportingErrors, status } = useContextEx(PanelContext, 'XyoPanel')
  return { history, panel, progress, reportingErrors, status }
}
